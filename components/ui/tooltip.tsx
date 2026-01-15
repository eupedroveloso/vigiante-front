"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const TooltipContext = React.createContext<TooltipContextValue | undefined>(undefined)

interface TooltipProviderProps {
  children: React.ReactNode
  delayDuration?: number
}

const TooltipProvider = ({ children, delayDuration = 300 }: TooltipProviderProps) => {
  return <>{children}</>
}

interface TooltipProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  delayDuration?: number
}

const Tooltip = ({ children, open: controlledOpen, onOpenChange, delayDuration = 300 }: TooltipProps) => {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen)
      }
      onOpenChange?.(newOpen)
    },
    [isControlled, onOpenChange]
  )

  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">
        {children}
      </div>
    </TooltipContext.Provider>
  )
}

const TooltipTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ className, asChild, children, ...props }, ref) => {
  const context = React.useContext(TooltipContext)
  const timeoutRef = React.useRef<NodeJS.Timeout>()

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    context?.setOpen(true)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      context?.setOpen(false)
    }, 100)
  }

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      ref,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      ...props,
    })
  }

  return (
    <button
      ref={ref}
      type="button"
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  )
})
TooltipTrigger.displayName = "TooltipTrigger"

// Arrow component - creates a speech bubble tail/pointer
// The arrow always comes from the opposite side of the tooltip box
// and has 0px margin from the text container
const TooltipArrow = ({ side }: { side: "top" | "bottom" | "left" | "right" }) => {
  const arrowConfig = {
    top: {
      // Tooltip is above trigger, arrow is on bottom edge of tooltip pointing down to trigger
      // Arrow center point positioned exactly at bottom edge (6px from bottom = center of 12px arrow)
      path: "M 0 0 L 6 6 L 12 0 Z",
      className: "bottom-0 left-1/2",
      style: { 
        transform: "translateX(-50%) translateY(50%)",
        marginBottom: "-6px"
      },
    },
    bottom: {
      // Tooltip is below trigger, arrow is on top edge of tooltip pointing up to trigger
      // Arrow center point positioned exactly at top edge (6px from top = center of 12px arrow)
      path: "M 0 6 L 6 0 L 12 6 Z",
      className: "left-1/2",
      style: { 
        transform: "translateX(-50%)",
        top: "-6px" // Center of arrow (6px) at the edge
      },
    },
    left: {
      // Tooltip is on left of trigger, arrow is on right edge of tooltip pointing right to trigger
      // Arrow center point positioned exactly at right edge (6px from right = center of 12px arrow)
      path: "M 0 0 L 6 6 L 0 12 Z",
      className: "right-0 top-1/2",
      style: { 
        transform: "translateY(-50%) translateX(50%)",
        marginRight: "-6px"
      },
    },
    right: {
      // Tooltip is on right of trigger, arrow is on left edge of tooltip pointing left to trigger
      // Arrow center point positioned exactly at left edge (6px from left = center of 12px arrow)
      path: "M 6 0 L 0 6 L 6 12 Z",
      className: "top-1/2",
      style: { 
        transform: "translateY(-50%)",
        left: "-6px" // Center of arrow (6px) at the edge
      },
    },
  }

  const config = arrowConfig[side]

  return (
    <div className={cn("absolute", config.className)} style={config.style}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-3"
      >
        <path
          d={config.path}
          fill="#171717"
          className="dark:fill-popover"
        />
      </svg>
    </div>
  )
}

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "bottom" | "left" | "right"
  sideOffset?: number
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, side = "top", sideOffset = 4, children, ...props }, ref) => {
    const context = React.useContext(TooltipContext)

    if (!context?.open) return null

    // Position classes based on side
    // The tooltip box is positioned relative to trigger, arrow is on opposite side
    const positionClasses = {
      top: "bottom-full left-1/2 -translate-x-1/2 mb-0",
      bottom: "top-full left-1/2 -translate-x-1/2 mt-0",
      left: "right-full top-1/2 -translate-y-1/2 mr-0",
      right: "left-full top-1/2 -translate-y-1/2 ml-0",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "z-50 absolute overflow-visible rounded-md px-3 py-1.5 text-xs shadow-md",
          "bg-[#171717] text-[#fafafa]",
          "dark:bg-popover dark:text-popover-foreground",
          positionClasses[side],
          className
        )}
        {...props}
      >
        <p className="flex-1 font-sans font-normal leading-[16px] text-xs whitespace-nowrap">
          {children}
        </p>
        <TooltipArrow side={side} />
      </div>
    )
  }
)
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
