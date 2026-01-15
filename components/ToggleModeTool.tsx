"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LocationDot, List } from "@/components/icons"

export type ToggleMode = "mapa" | "formularios"

export interface ToggleModeToolProps {
  className?: string
  mode?: ToggleMode
  onModeChange?: (mode: ToggleMode) => void
  size?: "sm" | "md" | "lg"
}

export function ToggleModeTool({
  className,
  mode = "mapa",
  onModeChange,
  size = "md",
}: ToggleModeToolProps) {
  const handleMapaClick = () => {
    if (mode !== "mapa") {
      onModeChange?.("mapa")
    }
  }

  const handleFormulariosClick = () => {
    if (mode !== "formularios") {
      onModeChange?.("formularios")
    }
  }

  const isMapa = mode === "mapa"
  const isFormularios = mode === "formularios"

  const sizeClasses = {
    sm: "h-7 w-7 p-1.5",
    md: "h-8 w-8 p-2",
    lg: "h-9 w-9 p-2.5",
  }

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <div
      className={cn(
        "bg-accent flex gap-0.5 items-center p-0.5 rounded-lg",
        className
      )}
    >
      {/* Mapa Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleMapaClick}
        className={cn(
          "rounded-md transition-all",
          sizeClasses[size],
          isMapa
            ? "bg-background border border-border"
            : "bg-accent hover:bg-accent/80"
        )}
        aria-label="Modo Mapa"
        aria-pressed={isMapa}
      >
        <LocationDot
          size={size === "sm" ? 18 : size === "md" ? 18 : 24}
          className={isMapa ? "[&>div]:!text-primary [&>div>div]:!text-primary" : ""}
          style={{ 
            color: isMapa ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"
          }}
        />
      </Button>

      {/* Formulários Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleFormulariosClick}
        className={cn(
          "rounded-md transition-all",
          sizeClasses[size],
          isFormularios
            ? "bg-background border border-border"
            : "bg-accent hover:bg-accent/80"
        )}
        aria-label="Modo Formulários"
        aria-pressed={isFormularios}
      >
        <List
          size={size === "sm" ? 18 : size === "md" ? 18 : 24}
          className={isFormularios ? "[&>div]:!text-primary [&>div>div]:!text-primary" : ""}
          style={{ 
            color: isFormularios ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"
          }}
        />
      </Button>
    </div>
  )
}
