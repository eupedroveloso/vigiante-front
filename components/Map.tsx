"use client"

import * as React from "react"
import Script from "next/script"
import { cn } from "@/lib/utils"

export interface MapProps {
  className?: string
  center?: [number, number]
  zoom?: number
  mapMode?: "satelite" | "gps" | "relevo"
  marker?: {
    position: [number, number]
    title?: string
  } | null
}

export function Map({ 
  className, 
  center = [-15.7942, -47.8822], // Brasília
  zoom = 13,
  mapMode = "gps",
  marker = null
}: MapProps) {
  const mapRef = React.useRef<HTMLDivElement>(null)
  const [mapInstance, setMapInstance] = React.useState<any>(null)
  const [isScriptLoaded, setIsScriptLoaded] = React.useState(false)
  const [isCssLoaded, setIsCssLoaded] = React.useState(false)
  const styleRef = React.useRef<HTMLStyleElement | null>(null)
  const tileLayerRef = React.useRef<any>(null)
  const markerRef = React.useRef<any>(null)

  // Carregar CSS do Leaflet
  React.useEffect(() => {
    if (typeof document === 'undefined') return

    // Verificar se já existe
    const existingLink = document.querySelector('link[href*="leaflet.css"]')
    if (existingLink) {
      setIsCssLoaded(true)
      return
    }

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    
    const handleLoad = () => {
      setIsCssLoaded(true)
    }
    
    const handleError = () => {
      console.error('Failed to load Leaflet CSS')
      // Aguardar um pouco e tentar novamente ou continuar
      setTimeout(() => setIsCssLoaded(true), 500)
    }
    
    link.addEventListener('load', handleLoad)
    link.addEventListener('error', handleError)
    
    document.head.appendChild(link)

    // Timeout de segurança
    const timeout = setTimeout(() => {
      setIsCssLoaded(true)
    }, 2000)

    return () => {
      clearTimeout(timeout)
      link.removeEventListener('load', handleLoad)
      link.removeEventListener('error', handleError)
    }
  }, [])

  // Inicializar mapa quando script e CSS estiverem carregados
  React.useEffect(() => {
    if (!isScriptLoaded || !isCssLoaded || mapInstance) return
    if (typeof window === 'undefined' || !(window as any).L) return
    if (!mapRef.current) return

    const initMap = () => {
      if (!mapRef.current) return
      
      try {
        const L = (window as any).L
        
        // Verificar se já existe um mapa neste container
        if (mapRef.current._leaflet_id) {
          return
        }

        // Criar mapa
        const map = L.map(mapRef.current, {
          center,
          zoom,
          zoomControl: false,
          attributionControl: false,
        })

        // Escolher tiles baseado no modo
        // Usar CartoDB Positron para estilo mais limpo e cores claras
        let tileUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
        let tileOptions: any = {
          maxZoom: 19,
          minZoom: 3,
        }

        if (mapMode === "satelite") {
          tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
          tileOptions.attribution = '© Esri'
          // Não definir subdomains para Esri
        } else if (mapMode === "gps") {
          // CartoDB Positron - estilo limpo com cores claras
          tileUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
          tileOptions.attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          tileOptions.subdomains = 'abcd'
        } else if (mapMode === "relevo") {
          tileUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
          tileOptions.attribution = '© OpenTopoMap contributors'
          tileOptions.subdomains = 'abc'
        } else {
          // Modo padrão - CartoDB Positron
          tileOptions.attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          tileOptions.subdomains = 'abcd'
        }

        const tileLayer = L.tileLayer(tileUrl, tileOptions).addTo(map)
        tileLayerRef.current = tileLayer

        // Aplicar estilos CSS
        if (!styleRef.current && typeof document !== 'undefined') {
          const style = document.createElement('style')
          style.id = 'map-waze-style'
          document.head.appendChild(style)
          styleRef.current = style
        }

        const getFilterForMode = () => {
          // Manter cores originais em todos os modos
          return "none"
        }

        if (styleRef.current) {
          styleRef.current.textContent = `
            .leaflet-container {
              background-color: ${mapMode === "satelite" ? "#1a1a1a" : mapMode === "relevo" ? "#d4c5a9" : "#f5f5f0"};
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            }
            .leaflet-tile-container img {
              filter: ${getFilterForMode()};
              image-rendering: -webkit-optimize-contrast;
              image-rendering: crisp-edges;
            }
            /* Estilo mais limpo - reduzir visibilidade de elementos pequenos */
            .leaflet-tile-pane {
              opacity: 0.98;
            }
            /* Garantir que o mapa tenha cores suaves e claras */
            .leaflet-container .leaflet-tile-pane {
              filter: brightness(1.05);
            }
          `
        }

        setMapInstance(map)

        // Adicionar marcador se fornecido
        if (marker && marker.position) {
          const L = (window as any).L
          const markerInstance = L.marker(marker.position).addTo(map)
          if (marker.title) {
            markerInstance.bindPopup(marker.title).openPopup()
          }
          markerRef.current = markerInstance
        }

        // Invalidar tamanho após um pequeno delay
        setTimeout(() => {
          if (map && map.invalidateSize) {
            map.invalidateSize()
          }
        }, 200)
      } catch (error) {
        console.error('Error initializing map:', error)
      }
    }

    // Pequeno delay para garantir que o DOM está pronto
    const timeoutId = setTimeout(initMap, 100)
    
    return () => {
      clearTimeout(timeoutId)
    }
  }, [isScriptLoaded, isCssLoaded, mapInstance, center, zoom, mapMode])

  // Atualizar view quando center ou zoom mudarem
  React.useEffect(() => {
    if (mapInstance && typeof window !== 'undefined' && (window as any).L) {
      try {
        mapInstance.setView(center, zoom)
        setTimeout(() => {
          mapInstance.invalidateSize()
        }, 50)
      } catch (error) {
        console.error('Error updating map view:', error)
      }
    }
  }, [mapInstance, center, zoom])

  // Atualizar marcador quando marker mudar
  React.useEffect(() => {
    if (!mapInstance || typeof window === 'undefined' || !(window as any).L) return
    
    const L = (window as any).L
    
    // Remover marcador anterior
    if (markerRef.current) {
      mapInstance.removeLayer(markerRef.current)
      markerRef.current = null
    }
    
    // Adicionar novo marcador se fornecido
    if (marker && marker.position) {
      const markerInstance = L.marker(marker.position).addTo(mapInstance)
      if (marker.title) {
        markerInstance.bindPopup(marker.title).openPopup()
      }
      markerRef.current = markerInstance
    }
  }, [mapInstance, marker])

  // Atualizar tiles quando o modo mudar
  React.useEffect(() => {
    if (!mapInstance || !tileLayerRef.current) return
    if (typeof window === 'undefined' || !(window as any).L) return

    try {
      const L = (window as any).L
      
      mapInstance.removeLayer(tileLayerRef.current)
      
      // Usar CartoDB Positron para estilo mais limpo e cores claras
      let tileUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
      let tileOptions: any = {
        maxZoom: 19,
        minZoom: 3,
      }

      if (mapMode === "satelite") {
        tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        tileOptions.attribution = '© Esri'
        // Não definir subdomains para Esri
      } else if (mapMode === "gps") {
        // CartoDB Positron - estilo limpo com cores claras
        tileUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
        tileOptions.attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        tileOptions.subdomains = 'abcd'
      } else if (mapMode === "relevo") {
        tileUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
        tileOptions.attribution = '© OpenTopoMap contributors'
        tileOptions.subdomains = 'abc'
      } else {
        // Modo padrão - CartoDB Positron
        tileOptions.attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        tileOptions.subdomains = 'abcd'
      }

      const newTileLayer = L.tileLayer(tileUrl, tileOptions).addTo(mapInstance)
      tileLayerRef.current = newTileLayer

      // Atualizar estilo CSS
      if (styleRef.current) {
        const getFilterForMode = () => {
          // Manter cores originais em todos os modos
          return "none"
        }

        styleRef.current.textContent = `
          .leaflet-container {
            background-color: ${mapMode === "satelite" ? "#1a1a1a" : mapMode === "relevo" ? "#d4c5a9" : "#f5f5f0"};
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          }
          .leaflet-tile-container img {
            filter: ${getFilterForMode()};
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }
          /* Estilo mais limpo - reduzir visibilidade de elementos pequenos */
          .leaflet-tile-pane {
            opacity: 1;
          }
        `
      }

      setTimeout(() => {
        mapInstance.invalidateSize()
      }, 50)
    } catch (error) {
      console.error('Error updating map mode:', error)
    }
  }, [mapInstance, mapMode])

  // Cleanup
  React.useEffect(() => {
    return () => {
      if (mapInstance) {
        try {
          if (markerRef.current) {
            mapInstance.removeLayer(markerRef.current)
          }
          mapInstance.remove()
        } catch (error) {
          console.error('Error removing map:', error)
        }
      }
    }
  }, [mapInstance])

  const isReady = isScriptLoaded && isCssLoaded

  return (
    <>
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        onLoad={() => {
          setIsScriptLoaded(true)
        }}
        onError={(e) => {
          console.error('Error loading Leaflet script:', e)
        }}
        strategy="lazyOnload"
      />
      <div 
        ref={mapRef} 
        className={cn("w-full h-full", className)}
        style={{ 
          width: '100%',
          height: '100%',
          minHeight: '100%',
          position: 'relative',
          zIndex: 1,
          backgroundColor: isReady ? 'transparent' : '#f5f5f0'
        }}
      >
        {!isReady && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <div className="text-sm">Carregando mapa...</div>
          </div>
        )}
      </div>
    </>
  )
}
