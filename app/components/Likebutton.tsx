"use client";
import React from "react";
import { Heart } from "lucide-react";

interface LikeProps {
    count: number;
    onClick: () => void;
    isLiked: boolean;
}

const LikeButton = ({ count, onClick, isLiked }: LikeProps) => {
    return (
        <button onClick={onClick} className="flex items-center gap-2 px-4 py-2 rounded-full bg-card-bg border border-card-border hover:bg-card-bg/50 transition-colors cursor-pointer shadow-sm">
            <Heart size={20} className={isLiked ? "fill-red-500 text-red-500" : "text-text-muted"} />
            <span className="text-foreground font-medium">{count}</span>
        </button>
    );
};

export default LikeButton;
