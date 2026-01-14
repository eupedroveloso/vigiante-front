"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  Expand,
  Plus,
  Minus,
  StreetView,
} from "@/components/icons"
import { MapModeView, MapViewMode } from "@/components/MapModeView"

export interface MapTool {
  id: string
  icon: React.ReactNode
  label?: string
  active?: boolean
  onClick?: () => void
}

export interface MapToolsProps {
  className?: string
  activeToolId?: string
  onToolChange?: (toolId: string) => void
  tools?: MapTool[]
  mapMode?: MapViewMode
  onMapModeChange?: (mode: MapViewMode) => void
}

const defaultTools: MapTool[] = [
  {
    id: "expand",
    icon: <Expand size={18} />,
    label: "Expandir",
  },
  {
    id: "plus",
    icon: <Plus size={18} />,
    label: "Zoom in",
  },
  {
    id: "minus",
    icon: <Minus size={18} />,
    label: "Zoom out",
  },
  {
    id: "street-view",
    icon: <StreetView size={18} />,
    label: "Street View",
  },
]

export function MapTools({
  className,
  activeToolId,
  onToolChange,
  tools = defaultTools,
  mapMode,
  onMapModeChange,
}: MapToolsProps) {
  const handleToolClick = (toolId: string) => {
    onToolChange?.(toolId)
  }

  return (
    <div
      className={cn(
        "bg-background flex flex-col items-center justify-center rounded-lg border border-border w-[48px]",
        "p-2 overflow-visible",
        className
      )}
    >
      <div className="flex flex-col gap-1 items-center justify-center w-full overflow-visible">
        {tools.map((tool, index) => {
          return (
            <React.Fragment key={tool.id}>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleToolClick(tool.id)}
                className="h-9 w-9"
                aria-label={tool.label || tool.id}
                title={tool.label}
              >
                {tool.icon}
              </Button>
              {index === 2 && <Separator orientation="horizontal" className="w-8 my-1" />}
            </React.Fragment>
          )
        })}
        {/* MapModeView abaixo do botão street-view */}
        <div className="flex items-center justify-center w-full overflow-visible">
          <MapModeView
            mode={mapMode}
            onModeChange={onMapModeChange}
          />
        </div>
      </div>
    </div>
  )
}
