"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: "default" | "sm" | "md" | "lg"
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = "default", ...props }, ref) => {
    const sizeClasses = {
      sm: "size-6",
      default: "size-10",
      md: "size-12",
      lg: "size-14",
    }

    const textSizeClasses = {
      sm: "text-xs",
      default: "text-sm",
      md: "text-base",
      lg: "text-lg",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-full shrink-0 overflow-hidden",
          "bg-muted",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || ""}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              "text-foreground font-medium",
              textSizeClasses[size]
            )}
          >
            {fallback || "?"}
          </div>
        )}
      </div>
    )
  }
)
Avatar.displayName = "Avatar"

export { Avatar }
