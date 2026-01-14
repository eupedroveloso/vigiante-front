import * as React from "react"
import { cn } from "@/lib/utils"

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
  className?: string
}

export interface IconComponentProps {
  className?: string
  size?: number | string
}

// Base Icon component wrapper
export function createIconComponent(
  name: string,
  SvgContent: React.FC<IconComponentProps>
) {
  const Icon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ className, size = 16, ...props }, ref) => {
      return (
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn("shrink-0", className)}
          {...props}
        >
          <SvgContent className={className} size={size} />
        </svg>
      )
    }
  )
  Icon.displayName = name
  return Icon
}
