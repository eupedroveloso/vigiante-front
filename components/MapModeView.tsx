"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MapSatelite, MapGps, MapRelevo, Map, LocationDot, LocationCrosshairs } from "@/components/icons"

export type MapViewMode = "satelite" | "gps" | "relevo"

export interface MapViewOption {
  id: MapViewMode
  label: string
  icon: React.ReactNode
  previewIcon: React.ReactNode
}

export interface MapModeViewProps {
  className?: string
  mode?: MapViewMode
  onModeChange?: (mode: MapViewMode) => void
}

const mapViewOptions: MapViewOption[] = [
  {
    id: "satelite",
    label: "Satélite",
    icon: <Map size={18} />,
    previewIcon: <MapSatelite size={36} />,
  },
  {
    id: "gps",
    label: "GPS",
    icon: <LocationCrosshairs size={18} />,
    previewIcon: <MapGps size={36} />,
  },
  {
    id: "relevo",
    label: "Relevo",
    icon: <LocationDot size={18} />,
    previewIcon: <MapRelevo size={36} />,
  },
]

// Componente interno para preview de imagem do mapa
function MapPreview({ 
  icon,
  isActive
}: { 
  icon: React.ReactNode
  isActive: boolean
}) {
  return (
    <div 
      className={cn(
        "aspect-square size-9 h-full relative rounded-[6.4px] shrink-0 flex items-center justify-center overflow-visible"
      )}
      style={isActive ? {
        boxShadow: "0 0 0 0.8px hsl(var(--primary))"
      } : {}}
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[6.4px]">
        <div className="absolute bg-white inset-0 rounded-[6.4px]" />
      </div>
      <div className="relative z-10 w-full h-full flex items-center justify-center rounded-[6.4px] overflow-hidden">
        <div className="w-full h-full">
          {icon}
        </div>
      </div>
    </div>
  )
}

export function MapModeView({
  className,
  mode = "gps",
  onModeChange,
}: MapModeViewProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  const handleModeChange = (newMode: MapViewMode) => {
    if (newMode !== mode) {
      onModeChange?.(newMode)
    }
  }

  return (
    <div
      className={cn(
        "relative inline-flex items-center",
        isHovered ? "justify-end" : "justify-center",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: isHovered ? "100%" : "36px",
      }}
    >
      {/* Container com expansão horizontal da direita para esquerda */}
      <div
        className={cn(
          "flex items-center rounded-lg transition-all duration-300 ease-in-out",
          "bg-background border border-border shadow-sm",
          "flex-row-reverse",
          isHovered ? "p-[2px] w-auto gap-[2px]" : "p-0 w-9 gap-0",
          "overflow-visible"
        )}
      >
        {/* Opções em ordem normal, mas renderizadas da direita para esquerda devido ao flex-row-reverse */}
        {mapViewOptions.map((option, index) => {
          const isActive = option.id === mode
          const isVisible = isHovered || isActive
          // Índice reverso para bordas arredondadas (já que estamos usando flex-row-reverse)
          const reverseIndex = mapViewOptions.length - 1 - index
          
          return (
            <Button
              key={option.id}
              variant="ghost"
              size="sm"
              onClick={() => handleModeChange(option.id)}
              className={cn(
                "h-9 rounded-none transition-all duration-300 ease-in-out",
                "flex items-center justify-center shrink-0 relative overflow-hidden",
                isActive && "bg-accent",
                !isActive && "bg-background hover:bg-muted",
                // Último item na ordem reversa (Relevo - direita) tem borda arredondada à direita
                reverseIndex === 0 && "rounded-r-lg",
                // Primeiro item na ordem reversa (Satélite - esquerda) tem borda arredondada à esquerda
                reverseIndex === mapViewOptions.length - 1 && "rounded-l-lg",
                // Sempre 36px de largura (h-9 w-9), sem padding ou margens
                "w-9 p-0 m-0"
              )}
              style={{
                width: "36px",
                minWidth: "36px",
                maxWidth: "36px",
                pointerEvents: isVisible ? "auto" : "none",
                margin: 0,
                padding: 0,
                // Usar display para controlar visibilidade (não ocupa espaço quando oculto)
                display: isVisible ? "flex" : "none",
                flexShrink: 0,
              }}
              aria-label={option.label}
              title={option.label}
            >
              {/* Preview da imagem do mapa - usando ícone da biblioteca */}
              <MapPreview
                key={`${option.id}-${isActive}`}
                icon={option.previewIcon}
                isActive={isActive}
              />
            </Button>
          )
        })}
      </div>
    </div>
  )
}
