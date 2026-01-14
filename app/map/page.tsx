"use client"

import * as React from "react"
import { PrincipalBar } from "@/components/PrincipalBar"
import { MapTools } from "@/components/MapTools"
import { cn } from "@/lib/utils"

// Componente para os pins/marcadores do mapa
interface MapPinProps {
  lat: number
  lng: number
  label?: string
  className?: string
}

function MapPin({ lat, lng, label, className }: MapPinProps) {
  return (
    <div
      className={cn(
        "absolute bg-white flex flex-col gap-[5.469px] items-center justify-center p-[5.469px] rounded-[54.693px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]",
        "transform -translate-x-1/2 -translate-y-1/2",
        className
      )}
      style={{
        left: `${lng}%`,
        top: `${lat}%`,
      }}
    >
      <div className="bg-[var(--tailwind-colors-gray-100,#f3f4f6)] flex items-center justify-center rounded-[49.223px] size-[33.227px]">
        <div className="relative size-[33.227px]">
          {/* Placeholder para ícone do prédio - pode ser substituído por um ícone real */}
          <div className="w-full h-full bg-muted rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-primary/20 rounded" />
          </div>
        </div>
      </div>
      {/* Pin pointer */}
      <div className="absolute h-[10.575px] left-[20.64px] top-[54.44px] w-[16.143px]">
        <div className="w-full h-full bg-white rounded-b-full" />
      </div>
      {label && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-foreground whitespace-nowrap">
          {label}
        </div>
      )}
    </div>
  )
}

export default function MapPage() {
  const [activeTool, setActiveTool] = React.useState<string | undefined>()

  // Coordenadas dos pins no mapa (em porcentagem)
  const mapPins = [
    { lat: 45, lng: 50, label: "Pin 1" },
    { lat: 35, lng: 75, label: "Pin 2" },
    { lat: 60, lng: 55, label: "Pin 3" },
    { lat: 70, lng: 30, label: "Pin 4" },
    { lat: 75, lng: 70, label: "Pin 5" },
    { lat: 50, lng: 25, label: "Pin 6" },
  ]

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* PrincipalBar no topo */}
      <div className="flex-shrink-0">
        <PrincipalBar />
      </div>

      {/* Área principal do mapa */}
      <div className="flex-1 relative bg-accent overflow-hidden">
        {/* Container do mapa */}
        <div className="absolute inset-0">
          {/* Placeholder do mapa - pode ser substituído por um mapa real (Google Maps, Mapbox, etc.) */}
          <div className="w-full h-full bg-gradient-to-br from-green-50 via-green-100 to-blue-50 relative">
            {/* Área verde (parques) */}
            <div className="absolute top-[10%] left-[10%] w-[40%] h-[50%] bg-green-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-[20%] right-[15%] w-[30%] h-[35%] bg-green-200/30 rounded-full blur-3xl" />
            
            {/* Área azul (água) */}
            <div className="absolute bottom-[5%] left-[5%] w-[25%] h-[30%] bg-blue-200/40 rounded-full blur-3xl" />
            
            {/* Linhas de estrada (simuladas) */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
              <path
                d="M 0 200 Q 200 150 400 200 T 800 200 T 1200 200 T 1600 200"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-400"
              />
              <path
                d="M 200 0 Q 200 200 200 400 T 200 800 T 200 1200"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-400"
              />
              <circle cx="400" cy="300" r="150" stroke="currentColor" strokeWidth="2" fill="none" className="text-gray-400" />
            </svg>

            {/* Pins/Marcadores */}
            {mapPins.map((pin, index) => (
              <MapPin
                key={index}
                lat={pin.lat}
                lng={pin.lng}
                label={pin.label}
              />
            ))}
          </div>
        </div>

        {/* MapTools no lado direito */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
          <MapTools
            activeToolId={activeTool}
            onToolChange={setActiveTool}
          />
        </div>
      </div>
    </div>
  )
}
