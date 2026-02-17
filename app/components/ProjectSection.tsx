"use client";

import { useState, useEffect } from "react";
import LikeButton from "@/app/components/Likebutton";
import { Github, ExternalLink, Calendar } from "lucide-react";
import { API_BASE_URL } from "@/lib/config";
import { getVisitorId } from "@/lib/visitorId";

/**
 * Interface defining the structure of a project item.
 * Matches the fields expected from the backend API.
 */
export interface GalleryItem {
    id: number;
    title: string;
    description: string;
    techstack: string; // Expected format: "React, Django, Tailwind"
    image: string;
    livelink: string;
    githublink: string;
    posted_at: string;
    total_like: number; // Mapping to backend 'total_like' field
}

// Backend URL from config
const BASE_URL = API_BASE_URL;

/**
 * ProjectCard Component
 * Displays a single project with its details, tech stack, and a like button.
 */
export default function ProjectCard({ item }: { item: GalleryItem }) {

    // --- STATE MANAGEMENT ---
    // Initialize likes and liked status
    const [likes, setLikes] = useState(item.total_like || 0);
    const [isLiked, setIsLiked] = useState(false);

    // --- EFFECT: SYNC LIKE STATUS FROM BACKEND ---
    // Fetch the actual status from the server based on the user's IP (for cross-browser sync)
    useEffect(() => {
        const syncStatus = async () => {
            try {
                const vid = getVisitorId();
                const res = await fetch(`${BASE_URL}/api/project/${item.id}/like?visitor_id=${vid}`);
                if (res.ok) {
                    const data = await res.json();
                    setIsLiked(data.is_liked);
                    // Sync local storage fallback
                    if (data.is_liked) {
                        localStorage.setItem(`liked_project_${item.id}`, "true");
                    } else {
                        localStorage.removeItem(`liked_project_${item.id}`);
                    }
                }
            } catch (error) {
                console.error("Failed to sync project like status:", error);
                // Fallback to local storage if API is down
                const localStatus = localStorage.getItem(`liked_project_${item.id}`);
                if (localStatus === "true") setIsLiked(true);
            }
        };

        syncStatus();
    }, [item.id]);

    // --- INTERACTION: LIKE BUTTON HANDLER ---
    // Implements Optimistic UI update for better user experience
    const handleLikeClick = async () => {
        const wasLiked = isLiked;

        // 1. Update UI immediately (Optimistic Logic)
        if (wasLiked) {
            setLikes((prev) => prev - 1);
            setIsLiked(false);
            localStorage.removeItem(`liked_project_${item.id}`);
        } else {
            setLikes((prev) => prev + 1);
            setIsLiked(true);
            localStorage.setItem(`liked_project_${item.id}`, "true");
        }

        // 2. Send request to the backend API to record the like
        try {
            const vid = getVisitorId();
            const res = await fetch(`${BASE_URL}/api/gallery/${item.id}/like/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ visitor_id: vid })
            });

            if (res.ok) {
                const data = await res.json();
                // 3. Sync with Backend Truth
                setLikes(data.total_like);

                if (data.message === "liked") {
                    setIsLiked(true);
                    localStorage.setItem(`liked_project_${item.id}`, "true");
                } else {
                    setIsLiked(false);
                    localStorage.removeItem(`liked_project_${item.id}`);
                }
            }
        } catch (error) {
            console.error("Like request failed, reverting state:", error);

            // Revert UI changes if the request fails
            setLikes(wasLiked ? likes : likes - 1);
            setIsLiked(wasLiked);
            if (wasLiked) {
                localStorage.setItem(`liked_project_${item.id}`, "true");
            } else {
                localStorage.removeItem(`liked_project_${item.id}`);
            }
        }
    };

    // --- HELPER FUNCTIONS ---

    // Correctly formats the image URL for display
    const getImageUrl = (path: any) => {
  if (!path) return "https://images.unsplash.com/photo-1555066931-4365d14bab8c";

  const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dgie5t9uw/";
  return `${CLOUDINARY_BASE_URL}${path}`;
};


    // Splits the tech stack string into an array of individual technologies
    const techStacks = item.techstack ? item.techstack.split(',').map(t => t.trim()) : [];

    // --- RENDER COMPONENT ---
    return (
        <div className="group flex flex-col bg-card-bg border border-card-border rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg h-full">

            {/* Project Image Section */}
            <div className="aspect-video overflow-hidden relative">
                <img
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Like Button overlayed on the image */}
                <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-full p-1 border border-white/10">
                    <LikeButton count={likes} onClick={handleLikeClick} isLiked={isLiked} />
                </div>
            </div>

            {/* Project Details Content */}
            <div className="p-6 flex flex-col flex-grow">

                {/* Posting Year */}
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-text-muted mb-3">
                    <Calendar size={12} />
                    {item.posted_at ? new Date(item.posted_at).getFullYear() : "Project"}
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                </h3>

                {/* Project Description (truncated) */}
                <p className="text-sm text-text-muted line-clamp-3 mb-6 leading-relaxed">
                    {item.description}
                </p>

                {/* Displaying Tech Stack as tags */}
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {techStacks.map((tech, i) => (
                        <span key={i} className="text-[10px] font-bold px-2 py-1 rounded bg-secondary/20 text-secondary-foreground border border-secondary/10">
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Links to Source Code and Live Project */}
                <div className="flex items-center gap-3 pt-4 border-t border-card-border/50">
                    {item.githublink && (
                        <a href={item.githublink} target="_blank" rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border border-card-border text-xs font-bold hover:bg-foreground hover:text-background transition-colors">
                            <Github size={14} /> Code
                        </a>
                    )}
                    {item.livelink && (
                        <a href={item.livelink} target="_blank" rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                            Live <ExternalLink size={14} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
