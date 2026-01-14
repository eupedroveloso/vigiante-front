"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Map, Xmark, House } from "@/components/icons"

export interface ProjectTabItem {
  id: string
  label: string
  icon?: React.ReactNode
  onClose?: () => void
}

export interface ProjectTabProps {
  className?: string
  activeTabId?: string
  onTabChange?: (tabId: string) => void
  onHomeClick?: () => void
  tabs?: ProjectTabItem[]
}

export function ProjectTab({
  className,
  activeTabId,
  onTabChange,
  onHomeClick,
  tabs = [],
}: ProjectTabProps) {
  const handleTabClick = (tabId: string) => {
    onTabChange?.(tabId)
  }

  const handleClose = (e: React.MouseEvent, tabId: string, onClose?: () => void) => {
    e.stopPropagation()
    onClose?.()
  }

  return (
    <div
      className={cn(
        "bg-card-foreground flex items-center relative w-full",
        className
      )}
    >
      {/* Home Button */}
      <div className="flex items-center">
        <div className="bg-secondary-foreground flex h-full items-center justify-center relative shrink-0 rounded-l-md" style={{ borderRight: "1px solid oklch(0.6 0 0)" }}>
          <Button
            variant="ghost"
            size="sm"
            onClick={onHomeClick}
            className="h-8 px-3 py-2 text-muted-foreground hover:text-foreground rounded-none"
            aria-label="Home"
          >
            <House size={18} />
          </Button>
        </div>
      </div>

      {/* Project Tabs */}
      <div className="flex items-center">
        {tabs.map((tab) => {
          const isActive = activeTabId === tab.id

          return (
            <div
              key={tab.id}
              className="flex h-full items-center justify-center relative shrink-0"
              style={{ borderRight: "1px solid oklch(0.4 0 0)" }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleTabClick(tab.id)}
                className={cn(
                  "h-8 px-3 py-2 gap-2 rounded-none",
                  isActive
                    ? "bg-background text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.icon || (
                  <Map 
                    size={18}
                    className={cn(
                      !isActive && "text-muted-foreground"
                    )} 
                  />
                )}
                <span className="text-[10px] leading-none font-normal">
                  {tab.label}
                </span>
                {isActive && (
                  <Xmark
                    size={18}
                    className="ml-2 cursor-pointer text-foreground"
                    onClick={(e) => handleClose(e, tab.id, tab.onClose)}
                  />
                )}
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
