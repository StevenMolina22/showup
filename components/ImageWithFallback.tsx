"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  fallbackText?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  className,
  fallbackClassName,
  fallbackText = "Image",
}: ImageWithFallbackProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className={fallbackClassName}>
        <div className="text-center">
          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">{fallbackText}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setImageError(true)}
    />
  );
}
