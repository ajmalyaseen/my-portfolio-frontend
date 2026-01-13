import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { API_BASE_URL, CLOUDINARY_BASE_URL } from "@/lib/config";


/**
 * Extracts a text excerpt from HTML content.
 * @param content - The HTML content string.
 * @param length - Maximum length of the excerpt.
 */
const getExcerpt = (content: string, length: number = 100) => {
    if (!content) return "";
    const text = content.replace(/<[^>]+>/g, ''); // Simple regex to strip HTML tags
    return text.length > length ? text.substring(0, length) + "..." : text;
};

/**
 * Calculates the approximate reading time based on word count.
 * @param content - The content string.
 */
const calculateReadTime = (content: string) => {
    if (!content) return "1 min read";
    const text = content.replace(/<[^>]+>/g, '');
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / 200); // Assuming 200 words per minute
    return `${time} min read`;
};

/**
 * Fetches the list of blog posts from the backend API.
 * Returns an empty array on failure.
 */
async function getBlogs() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/blogs/`, {
            cache: "no-store", // Ensure fresh data on every request
        });

        if (!res.ok) return [];

        const data = await res.json();

        // Safety check to ensure the returned data is an array
        if (Array.isArray(data)) {
            return data;
        }

        return [];

    } catch (error) {
        console.error("Failed to fetch blogs from API:", error);
        return [];
    }
}

export const dynamic = 'force-dynamic';
export default async function Blog() {
    const allPosts = await getBlogs();

    // Split posts into featured and standard posts
    const featuredPost = allPosts[0];
    const otherPosts = allPosts.slice(1);

    /**
     * Resolves the image URL, handling both absolute and relative paths.
     */
    const getImageUrl = (path: string) => {
        if (!path) return "https://images.unsplash.com/photo-1499750310159-5b9883e73975?w=800&q=80";
        // Check if the path is already a full URL or needs to be prepended
        return path.startsWith("http") ? path : `${CLOUDINARY_BASE_URL}/${path}`;
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <main className="max-w-6xl mx-auto">
                {/* Blog Header */}
                <header className="mb-16 text-center md:text-left">
                    <span className="text-blue-500 font-bold tracking-widest text-xs uppercase mb-2 block">
                        The Journal
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-foreground">
                        Writings & <span className="text-primary italic">Thoughts.</span>
                    </h1>
                </header>

                {/* Conditional Rendering: Check if any posts exist */}
                {allPosts.length === 0 ? (
                    <div className="py-20 text-center border border-dashed border-card-border rounded-3xl">
                        <p className="text-text-muted">No posts found yet. Add some in the Django Admin panel!</p>
                    </div>
                ) : (
                    <>
                        {/* Display the most recent post as a Featured Post */}
                        {featuredPost && (
                            <div className="mb-20 group relative rounded-[2.5rem] overflow-hidden bg-card-bg border border-card-border hover:border-blue-500/30 transition-all duration-500 shadow-sm hover:shadow-2xl">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                    {/* Featured Image */}
                                    <div className="relative h-[300px] lg:h-[500px] overflow-hidden">
                                        <img
                                            src={getImageUrl(featuredPost.image)}
                                            alt={featuredPost.title}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                    </div>
                                    {/* Featured Content Details */}
                                    <div className="p-8 md:p-12 flex flex-col justify-center">
                                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-blue-500 mb-6">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={12} />
                                                {featuredPost.created_at ? new Date(featuredPost.created_at).toLocaleDateString() : 'Date N/A'}
                                            </span>
                                            <span className="w-1 h-1 bg-zinc-500 rounded-full" />
                                            <span className="flex items-center gap-1">
                                                <Clock size={12} />
                                                {calculateReadTime(featuredPost.content)}
                                            </span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-foreground group-hover:text-primary transition-colors">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="text-text-muted text-lg mb-8 line-clamp-3 leading-relaxed">
                                            {getExcerpt(featuredPost.content, 200)}
                                        </p>
                                        <Link href={`/blog/${featuredPost.id}`}>
                                            <button className="bg-foreground text-background px-8 py-4 rounded-full font-bold hover:bg-primary hover:text-white transition-all active:scale-95 flex items-center gap-2">
                                                Read Featured Article <ArrowRight size={18} />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Standard Posts Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {otherPosts.map((post: any) => (
                                <Link href={`/blog/${post.id}`} key={post.id} className="group">
                                    <article className="h-full flex flex-col bg-card-bg border border-card-border rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                                        {/* Post Thumbnail */}
                                        <div className="aspect-[4/3] overflow-hidden relative">
                                            <img
                                                src={getImageUrl(post.image)}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                        {/* Post Summary Content */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex items-center justify-between text-xs font-medium text-text-muted mb-4">
                                                <span>
                                                    {post.created_at ? new Date(post.created_at).toLocaleDateString() : 'Date N/A'}
                                                </span>
                                                <span>{calculateReadTime(post.content)}</span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-3 leading-snug text-foreground group-hover:text-primary transition-colors">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-text-muted line-clamp-2 mb-6 leading-relaxed">
                                                {getExcerpt(post.content, 120)}
                                            </p>
                                            <div className="mt-auto flex items-center text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                                                Read More <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

