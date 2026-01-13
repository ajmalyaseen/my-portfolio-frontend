"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle, XCircle } from "lucide-react";
import { API_BASE_URL } from "@/lib/config";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        username: "",
        usermail: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch(`${API_BASE_URL}/api/contact/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ username: "", usermail: "", message: "" });
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                const data = await res.json();
                console.error("Backend Error:", data);
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <div className="w-full max-w-md bg-card-bg border border-card-border p-8 rounded-3xl shadow-sm">
            <h3 className="text-xl font-bold mb-6 text-foreground">Send me a message</h3>

            {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-10 text-green-500 animate-in fade-in">
                    <CheckCircle size={48} className="mb-4" />
                    <p className="font-bold">Message Sent!</p>
                    <p className="text-sm text-text-muted mt-2">I'll get back to you soon.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Name</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-background border border-card-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                            placeholder="Your Name"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-background border border-card-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                            placeholder="yourmail@example.com"
                            value={formData.usermail}
                            onChange={(e) => setFormData({ ...formData, usermail: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Message</label>
                        <textarea
                            required
                            rows={4}
                            className="w-full bg-background border border-card-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                            placeholder="Hello, I have a project idea..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {status === "loading" ? (
                            <>
                                <Loader2 size={20} className="animate-spin" /> Sending...
                            </>
                        ) : (
                            <>
                                <Send size={20} /> Send Message
                            </>
                        )}
                    </button>

                    {status === "error" && (
                        <div className="flex items-center gap-2 text-red-500 text-sm mt-4 bg-red-500/10 p-3 rounded-lg">
                            <XCircle size={16} />
                            <span>Error! Check console for details.</span>
                        </div>
                    )}
                </form>
            )}
        </div>
    );
}