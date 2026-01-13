import BlogContent from "@/app/components/BlogContent";
import { API_BASE_URL } from "@/lib/config";

/**
 * Fetches a single blog post by its ID from the backend API.
 * @param id - The unique identifier of the blog post.
 */
async function getBlogPost(id: string) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/blog/${id}/`, {
            cache: "no-store", // Do not cache to ensure latest content
        });

        // If the response is not OK (e.g., 404), return null
        if (!res.ok) {
            return null;
        }

        return res.json();
    } catch (error) {
        console.error("Error fetching blog post from API:", error);
        return null;
    }
}

/**
 * Dynamic Blog Post Page Component.
 * Inherits the 'id' from the URL parameters.
 */
export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const blog = await getBlogPost(id);

    // Error UI: Displayed when the blog post is not found or an error occurred
    if (!blog) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="bg-red-500/10 text-red-500 p-4 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                </div>
                <h1 className="text-3xl font-bold mb-2">Blog Post Not Found</h1>
                <p className="text-text-muted max-w-md">
                    The article you are looking for doesn't exist or has been removed.
                </p>
                <a href="/blog" className="mt-8 px-6 py-3 bg-foreground text-background rounded-xl font-bold hover:bg-primary hover:text-white transition-colors">
                    Back to Blog
                </a>
            </div>
        );
    }

    // Success UI: Render the blog content using the BlogContent component
    return <BlogContent post={blog} />;
}

