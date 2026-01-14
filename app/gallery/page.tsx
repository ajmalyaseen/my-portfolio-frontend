// app/gallery/page.tsx
import React from "react";
import { API_BASE_URL, CLOUDINARY_BASE_URL } from "@/lib/config";

// Data Type
interface GalleryItem {
    id: number;
    title: string;
    description: string;
    image: string; // Ensure backend sends 'image' URL
    link?: string; // Optional url if backend has it
}

// Data Fetching Function
async function getGalleryItems() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/gallery/`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        const response = await res.json();

        // 1. Check for custom response with 'data' key
        if (response.data && Array.isArray(response.data)) {
            return response.data;
        }

        // 2. Direct list fallback (Safety check)
        if (Array.isArray(response)) {
            return response;
        }

        return []; // Return empty array if no data found

    } catch (error) {
        console.error("Error fetching gallery items:", error);
        return [];
    }
}

export const dynamic = 'force-dynamic';
export default async function Gallery() {
    const galleryItems: GalleryItem[] = await getGalleryItems();

    return (
        <div className="min-h-screen pt-28 pb-20">
            <main className="max-w-6xl mx-auto px-6">
                <header className="mb-20 text-center md:text-left">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-foreground">
                        Resource <span className="text-primary italic">Gallery.</span>
                    </h1>
                    <p className="text-text-muted text-lg md:text-xl max-w-2xl leading-relaxed font-medium">
                        A power-packed collection of roadmaps, cheat sheets, and deep-dive guides curated for modern developers.
                    </p>
                </header>

                {galleryItems.length === 0 ? (
                    <div className="text-center py-20 text-text-muted">
                        No items found.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {galleryItems.map((item) => (
                            <div
                                key={item.id}
                                className="group flex flex-col bg-card-bg border border-card-border rounded-[2.5rem] overflow-hidden hover:border-primary/40 transition-all duration-700 hover:shadow-xl"
                            >
                                {/* Image Section */}
                                <div className="aspect-[16/10] overflow-hidden relative">
                                    <img
                                        src={
                                            item.image.startsWith("http")
                                                ? item.image
                                                : `${CLOUDINARY_BASE_URL}/${item.image}`
                                        }
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                </div>

                                {/* Content Section */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    <p className="text-text-muted text-base leading-relaxed mb-10 font-medium line-clamp-3">
                                        {item.description}
                                    </p>

                                    {/* Link to the external resource */}
                                    <div className="mt-auto flex items-center justify-between">
                                        <a
                                            href={item.link} // Ensure this field matches your backend API key (e.g., 'url' or 'link')
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white text-sm font-bold px-8 py-3.5 rounded-2xl transition-all shadow-md active:scale-95 cursor-pointer"
                                        >
                                            Explore Resource
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

