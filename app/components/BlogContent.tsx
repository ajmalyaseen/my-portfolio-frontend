"use client";

import { useState, useEffect } from "react";
import LikeButton from "@/app/components/Likebutton";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { API_BASE_URL, CLOUDINARY_BASE_URL } from "@/lib/config";

// Backend URL
const BASE_URL = API_BASE_URL;

// 👇 1. Comment Interface
interface Comment {
    id: number;
    name: string;
    comment: string; // User's comment body
    posted_at: string; // Timestamp of the comment
}

// 👇 2. BlogPost Interface
interface BlogPost {
    id: number;
    title: string;
    content: string;
    image: string;
    created_at: string;
    total_like: number; // Mapping to backend 'total_like' field
    comments: Comment[];
}

export default function BlogContent({ post }: { post: BlogPost }) {
    // State management for likes and comments
    const [likes, setLikes] = useState(post.total_like || 0);
    const [isLiked, setIsLiked] = useState(false);

    const [comments, setComments] = useState<Comment[]>(post.comments || []);

    // Form state for new comments
    const [commentInput, setCommentInput] = useState({ name: "", comment: "" });
    const [loading, setLoading] = useState(false);

    // Sync like status with Backend on mount (Cross-browser IP check)
    useEffect(() => {
        const checkLikeStatus = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/blog/${post.id}/like/`);
                if (res.ok) {
                    const data = await res.json();
                    setIsLiked(data.is_liked);
                    // Also sync local storage as a fallback
                    if (data.is_liked) {
                        localStorage.setItem(`liked_blog_${post.id}`, "true");
                    } else {
                        localStorage.removeItem(`liked_blog_${post.id}`);
                    }
                }
            } catch (error) {
                console.error("Failed to sync like status:", error);
                // Fallback to local storage if API fails
                const localStatus = localStorage.getItem(`liked_blog_${post.id}`);
                if (localStatus === "true") setIsLiked(true);
            }
        };

        checkLikeStatus();
    }, [post.id]);

    // Handle like functionality with Optimistic UI updates
    const handleLikeClick = async () => {
        const wasLiked = isLiked;

        // A. Optimistic Update (Update UI immediately)
        if (wasLiked) {
            setLikes((prev) => prev - 1);
            setIsLiked(false);
            localStorage.removeItem(`liked_blog_${post.id}`);
        } else {
            setLikes((prev) => prev + 1);
            setIsLiked(true);
            localStorage.setItem(`liked_blog_${post.id}`, "true");
        }

        // B. Send request to Backend
        try {
            const res = await fetch(`${BASE_URL}/api/blog/${post.id}/like/`, {
                method: "POST",
            });

            if (!res.ok) {
                throw new Error("Server synchronization failed");
            }

            const data = await res.json();

            // C. Sync with Backend Truth
            // Update the local state with the actual count and status from the server
            setLikes(data.total_like);

            if (data.message === "liked") {
                setIsLiked(true);
                localStorage.setItem(`liked_blog_${post.id}`, "true");
            } else {
                setIsLiked(false);
                localStorage.removeItem(`liked_blog_${post.id}`);
            }

        } catch (error) {
            console.error("Like failed, reverting state...", error);
            // D. Error Handling: Revert UI if backend request fails
            setLikes(wasLiked ? likes : likes - 1);
            setIsLiked(wasLiked);
            if (wasLiked) {
                localStorage.setItem(`liked_blog_${post.id}`, "true");
            } else {
                localStorage.removeItem(`liked_blog_${post.id}`);
            }
        }
    };

    // Handle comment submission
    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Validation check
        if (!commentInput.name || !commentInput.comment) return;

        setLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/api/blog/${post.id}/comment/create/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(commentInput),
            });
            if (res.ok) {
                const newComment = await res.json();

                // Append the new comment to the current list
                setComments((prev) => [newComment, ...prev]);

                // Clear form fields
                setCommentInput({ name: "", comment: "" });
            } else {
                console.error("Failed to post comment. Server returned:", res.status);
            }
        } catch (error) {
            console.error("Comment submission failed", error);
        } finally {
            setLoading(false);
        }
    };

    // ഇമേജ് URL ശരിയാക്കുന്നു
    const imageUrl = post.image
        ? post.image.startsWith("http")
            ? post.image
            : `${CLOUDINARY_BASE_URL}/${post.image}`
        : "https://images.unsplash.com/photo-1499750310159-5b9883e73975?w=800&q=80";

    return (
        <div className="pt-32 px-6 max-w-3xl mx-auto pb-20">
            <Link href="/blog" className="inline-flex items-center gap-2 text-text-muted hover:text-foreground mb-8 transition-colors group">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Blog</span>
            </Link>

            <div className="relative w-full h-[400px] mb-8 rounded-2xl overflow-hidden border border-card-border">
                <img src={imageUrl} alt={post.title} className="w-full h-full object-cover" />
            </div>

            <h1 className="text-4xl font-bold mb-4 text-foreground">{post.title}</h1>

            {/* Posted At Date Section */}
            <p className="text-text-muted mb-8 text-sm">
                Published on {new Date(post.created_at).toLocaleDateString("en-US", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
            </p>

            <div className="prose prose-invert mb-10 text-text-muted leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }}></div>

            {/* Like Button */}
            <div className="border-t border-card-border pt-8 mt-8 pb-8 flex justify-end">
                <LikeButton count={likes} onClick={handleLikeClick} isLiked={isLiked} />
            </div>

            {/* Comments Section */}
            <div className="border-t border-card-border pt-12 mt-8">
                <h3 className="text-2xl font-bold mb-8 text-foreground">Comments ({comments.length})</h3>
                <form onSubmit={handleCommentSubmit} className="mb-12 bg-card-bg p-6 rounded-2xl border border-card-border">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full mb-4 p-3 rounded-xl bg-background border border-card-border focus:border-primary outline-none"
                        value={commentInput.name}
                        onChange={(e) => setCommentInput({ ...commentInput, name: e.target.value })}
                        required
                    />
                    <textarea
                        rows={3}
                        placeholder="Write a comment..."
                        className="w-full mb-4 p-3 rounded-xl bg-background border border-card-border focus:border-primary outline-none resize-none"
                        // 'comment' ഫീൽഡ് അപ്‌ഡേറ്റ് ചെയ്യുന്നു
                        value={commentInput.comment}
                        onChange={(e) => setCommentInput({ ...commentInput, comment: e.target.value })}
                        required
                    />
                    <button type="submit" disabled={loading} className="px-6 py-2 bg-foreground text-background font-bold rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center gap-2">
                        {loading ? "Posting..." : <><Send size={16} /> Post Comment</>}
                    </button>
                </form>

                {/* Comment List */}
                <div className="space-y-6">
                    {comments.map((c) => (
                        <div key={c.id} className="p-4 border border-card-border rounded-2xl">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                    {c.name[0].toUpperCase()}
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">{c.name}</h4>
                                    {/* 'posted_at' ഉപയോഗിക്കുന്നു */}
                                    <span className="text-xs text-text-muted">{new Date(c.posted_at).toLocaleDateString("en-US", {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</span>
                                </div>
                            </div>
                            {/* 'comment' ഉപയോഗിക്കുന്നു */}
                            <p className="text-text-muted text-sm pl-11">{c.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}