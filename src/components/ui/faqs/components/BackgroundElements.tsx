import React from 'react';

export const BackgroundElements = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Base gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-200/70 via-transparent to-secondary-200/70" />

            {/* Large soft organic shapes */}
            <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-primary-200/50 rounded-full blur-2xl" />
            <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-secondary-200/50 rounded-full blur-2xl" />
            <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-accent-200/50 rounded-full blur-2xl" />

            {/* Enhanced blur mask for container area */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/80 to-transparent backdrop-blur-[4px] pointer-events-none" />

            {/* Animated blobs with increased visibility */}
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary-200/60 rounded-full blur-2xl animate-blob group-hover:blur-xl transition-all duration-500" />
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-secondary-200/60 rounded-full blur-2xl animate-blob animation-delay-2000 group-hover:blur-xl transition-all duration-500" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-200/60 rounded-full blur-2xl animate-blob animation-delay-4000 group-hover:blur-xl transition-all duration-500" />

            {/* Enhanced shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer backdrop-blur-sm" />
        </div>
    );
}; 