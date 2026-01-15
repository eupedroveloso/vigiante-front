"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { PrincipalBar } from "@/components/PrincipalBar"
import { MapTools } from "@/components/MapTools"
import { MapModeView, MapViewMode } from "@/components/MapModeView"
import { Map } from "@/components/Map"

export default function MapPage() {
  const router = useRouter()
  const [activeTool, setActiveTool] = React.useState<string | undefined>()
  const [mapMode, setMapMode] = React.useState<MapViewMode>("gps")
  const [mapCenter, setMapCenter] = React.useState<[number, number]>([-15.7942, -47.8822]) // Brasília
  const [mapZoom, setMapZoom] = React.useState(13)
  const [marker, setMarker] = React.useState<{ position: [number, number]; title?: string } | null>(null)

  // Handlers para zoom
  const handleZoomIn = () => {
    setMapZoom((prev) => Math.min(prev + 1, 19))
  }

  const handleZoomOut = () => {
    setMapZoom((prev) => Math.max(prev - 1, 3))
  }

  // Integração com MapTools
  React.useEffect(() => {
    if (activeTool === "plus") {
      handleZoomIn()
    } else if (activeTool === "minus") {
      handleZoomOut()
    }
  }, [activeTool])

  const handleModeChange = (mode: "mapa" | "formularios") => {
    if (mode === "formularios") {
      router.push("/forms")
    }
  }

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setMarker(null)
      return
    }
    
    try {
      // Usar Nominatim (OpenStreetMap) para geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'Vigiante App'
          }
        }
      )
      const data = await response.json()
      
      if (data && data.length > 0) {
        const result = data[0]
        const lat = parseFloat(result.lat)
        const lon = parseFloat(result.lon)
        const displayName = result.display_name || query
        
        setMapCenter([lat, lon])
        setMapZoom(15) // Zoom maior quando busca um local específico
        setMarker({
          position: [lat, lon],
          title: displayName
        })
      } else {
        setMarker(null)
      }
    } catch (error) {
      console.error("Erro ao buscar local:", error)
      setMarker(null)
    }
  }

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* PrincipalBar no topo */}
      <div className="flex-shrink-0">
        <PrincipalBar 
          initialMode="mapa" 
          onModeChange={handleModeChange}
          onSearch={handleSearch}
        />
      </div>

      {/* Área principal do mapa */}
      <div className="flex-1 relative bg-accent overflow-hidden" style={{ height: '100%', width: '100%' }}>
        <Map
          center={mapCenter}
          zoom={mapZoom}
          mapMode={mapMode}
          marker={marker}
          className="absolute inset-0 w-full h-full"
        />

        {/* MapTools no lado direito */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
          <MapTools
            activeToolId={activeTool}
            onToolChange={setActiveTool}
            mapMode={mapMode}
            onMapModeChange={setMapMode}
          />
        </div>

        {/* Indicador de zoom */}
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-border text-sm z-20 shadow-sm">
          Zoom: {mapZoom}x
        </div>
      </div>
    </div>
  )
}
