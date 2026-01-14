"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  size?: number | string
}

// Cache para SVGs carregados
const svgCache = new globalThis.Map<string, string>()

// Função para carregar SVG
async function loadSVG(src: string): Promise<string> {
  if (svgCache.has(src)) {
    return svgCache.get(src)!
  }
  
  try {
    const response = await fetch(src)
    if (!response.ok) {
      throw new Error(`Failed to load SVG: ${src}`)
    }
    const svgText = await response.text()
    svgCache.set(src, svgText)
    return svgText
  } catch (error) {
    console.error(`Erro ao carregar SVG: ${src}`, error)
    return ""
  }
}

// Helper function to validate and normalize size
function normalizeSize(size: number | string | undefined): string {
  if (typeof size === "string") {
    return size
  }
  
  const numSize = size ?? 18 // Tamanho padrão: 18px
  
  // Se for número menor que 18, usar 18 como mínimo
  if (numSize < 18) {
    return "18px"
  }
  
  // Se for exatamente 18, manter 18 (tamanho base)
  if (numSize === 18) {
    return "18px"
  }
  
  // Para tamanhos > 18, arredondar para o múltiplo de 8 mais próximo
  // Exemplos: 20->24, 25->24, 28->32, 30->32, 40->40
  const rounded = Math.round(numSize / 8) * 8
  
  // Garantir mínimo de 24 para valores > 18 (caso o arredondamento resulte em 16)
  return `${Math.max(24, rounded)}px`
}

// Helper to create icon components
function createIcon(
  name: string,
  src: string
): React.ForwardRefExoticComponent<IconProps & React.RefAttributes<HTMLDivElement>> {
  const Icon = React.forwardRef<HTMLDivElement, IconProps>(
    ({ className, size, ...props }, ref) => {
      const [svgContent, setSvgContent] = React.useState<string>("")
      const [isLoading, setIsLoading] = React.useState(true)
      const [hasError, setHasError] = React.useState(false)
      
      const sizeValue = normalizeSize(size)
      const numSize = typeof size === "number" 
        ? (size < 18 ? 18 : size === 18 ? 18 : Math.max(24, Math.round(size / 8) * 8))
        : (size ? parseInt(size.replace('px', '')) : 18)
      
      // Verificar se é um ícone personalizado (ilustração vetorial multicolorida ou imagem PNG)
      const isPersonalizadoIcon = name === "Heatmap" || name === "StreetView" || 
                                  name === "MapSatelite" || name === "MapGps" || name === "MapRelevo"
      const isImageIcon = src.endsWith('.png') || src.endsWith('.jpg') || src.endsWith('.jpeg') || 
                         (src.endsWith('.svg') && (name === "MapSatelite" || name === "MapGps" || name === "MapRelevo"))
      
      // Resetar estados quando src mudar (especialmente para imagens)
      React.useEffect(() => {
        // Sempre resetar erro quando src mudar
        setHasError(false)
        
        if (isImageIcon) {
          // Para imagens, resetar todos os estados imediatamente
          setIsLoading(false)
          return
        }
        
        // Para SVGs, resetar e começar a carregar
        setIsLoading(true)
        
        loadSVG(src).then((svg) => {
          if (svg) {
            if (isPersonalizadoIcon) {
              // Para ícones personalizados SVG, preservar viewBox original e cores
              let processedSvg = svg
                .replace(/width="[^"]*"/g, `width="${numSize}"`)
                .replace(/height="[^"]*"/g, `height="${numSize}"`)
              // Manter viewBox original (32x32) e preserveAspectRatio
              if (!svg.includes('preserveAspectRatio')) {
                processedSvg = processedSvg.replace(/<svg([^>]*)>/, '<svg$1 preserveAspectRatio="xMidYMid meet">')
              }
              setSvgContent(processedSvg)
            } else {
              // Para ícones normais, processar normalmente
              let processedSvg = svg
                .replace(/width="[^"]*"/g, `width="${numSize}"`)
                .replace(/height="[^"]*"/g, `height="${numSize}"`)
                .replace(/viewBox="[^"]*"/g, 'viewBox="0 0 16 16"')
                .replace(/preserveAspectRatio="[^"]*"/g, 'preserveAspectRatio="xMidYMid meet"')
              
              // Garantir que o SVG tenha fill="none" no elemento raiz
              if (!processedSvg.includes('fill="none"')) {
                processedSvg = processedSvg.replace(/<svg([^>]*)>/, '<svg$1 fill="none">')
              }
              
              setSvgContent(processedSvg)
            }
          }
          setIsLoading(false)
        })
      }, [src, numSize, isPersonalizadoIcon, isImageIcon, name])
      
      if (isLoading) {
        return (
          <div
            ref={ref}
            className={cn(
              "inline-flex items-center justify-center shrink-0",
              "aspect-square",
              className
            )}
            style={{ 
              width: sizeValue, 
              height: sizeValue,
              minWidth: sizeValue,
              minHeight: sizeValue
            }}
            {...props}
          />
        )
      }
      
      // Se for imagem PNG/JPG, renderizar como <img> tag
      if (isImageIcon) {
        return (
          <div
            ref={ref}
            className={cn(
              "inline-flex items-center justify-center shrink-0 relative",
              "aspect-square", // Garantir proporção quadrada
              className
            )}
            style={{ 
              width: sizeValue, 
              height: sizeValue,
              minWidth: sizeValue,
              minHeight: sizeValue
            }}
            {...props}
          >
            {!hasError ? (
              <img
                key={`${src}-${numSize}-${name}`}
                src={src}
                alt={name}
                width={numSize}
                height={numSize}
                className="w-full h-full rounded-[6.4px]"
                style={{ 
                  objectFit: "cover",
                  aspectRatio: "1 / 1",
                  display: "block"
                }}
                loading="eager"
                onError={(e) => {
                  console.error(`❌ Erro ao carregar imagem: ${src}`, e)
                  setHasError(true)
                }}
                onLoad={() => {
                  console.log(`✅ Imagem carregada: ${src}`)
                  setHasError(false)
                }}
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs rounded-[6.4px]">
                ?
              </div>
            )}
          </div>
        )
      }
      
      return (
        <div
          ref={ref}
          className={cn(
            "inline-flex items-center justify-center shrink-0",
            "aspect-square", // Garantir proporção quadrada
            className
          )}
          style={{ 
            width: sizeValue, 
            height: sizeValue,
            minWidth: sizeValue,
            minHeight: sizeValue,
            color: "inherit" // Herdar cor do texto para currentColor funcionar
          }}
          {...props}
        >
          {svgContent && (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ color: "inherit" }}
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          )}
        </div>
      )
    }
  )
  Icon.displayName = name
  return Icon
}

// Icon paths (local files in public/icons/)
const iconUrls = {
  "arrow-up-from-bracket": "/icons/arrow-up-from-bracket.svg",
  "file": "/icons/file.svg",
  "circle-info": "/icons/circle-info.svg",
  "palette": "/icons/palette.svg",
  "check": "/icons/check.svg",
  "users-rectangle": "/icons/users-rectangle.svg",
  "lock-keyhole": "/icons/lock-keyhole.svg",
  "calendar": "/icons/calendar.svg",
  "user": "/icons/user.svg",
  "align-left": "/icons/align-left.svg",
  "clock": "/icons/clock.svg",
  "copy": "/icons/copy.svg",
  "sliders": "/icons/sliders.svg",
  "gear": "/icons/gear.svg",
  "arrow-up-from-square": "/icons/arrow-up-from-square.svg",
  "share-nodes": "/icons/share-nodes.svg",
  "play": "/icons/play.svg",
  "floppy-disk": "/icons/floppy-disk.svg",
  "grip-dots-vertical": "/icons/grip-dots-vertical.svg",
  "grip-dots": "/icons/grip-dots.svg",
  "list": "/icons/list.svg",
  "map": "/icons/map.svg",
  "file-circle-info": "/icons/file-circle-info.svg",
  "list-collection": "/icons/list-collection.svg",
  "bullseye": "/icons/bullseye.svg",
  "eye": "/icons/eye.svg",
  "eye-slash": "/icons/eye-slash.svg",
  "expand": "/icons/expand.svg",
  "chevron-right": "/icons/chevron-right.svg",
  "chevron-left": "/icons/chevron-left.svg",
  "chevron-up": "/icons/chevron-up.svg",
  "chevron-down": "/icons/chevron-down.svg",
  "crosshairs-simple": "/icons/crosshairs-simple.svg",
  "focus": "/icons/focus.svg",
  "location-dot": "/icons/location-dot.svg",
  "minus": "/icons/minus.svg",
  "plus": "/icons/plus.svg",
  "rotate-right": "/icons/rotate-right.svg",
  "trash": "/icons/trash.svg",
  "filter": "/icons/filter.svg",
  "ruler": "/icons/ruler.svg",
  "list-tree": "/icons/list-tree.svg",
  "circle": "/icons/circle.svg",
  "list-timeline": "/icons/list-timeline.svg",
  "list-radio": "/icons/list-radio.svg",
  "magnifying-glass-location": "/icons/magnifying-glass-location.svg",
  "folder-tree": "/icons/folder-tree.svg",
  "magnifying-glass": "/icons/magnifying-glass.svg",
  "bell": "/icons/bell.svg",
  "clipboard-user": "/icons/clipboard-user.svg",
  "calendar-lines": "/icons/calendar-lines.svg",
  "xmark": "/icons/xmark.svg",
  "location-crosshairs": "/icons/location-crosshairs.svg",
  "arrow-down-to-bracket": "/icons/arrow-down-to-bracket.svg",
  "border-inner": "/icons/border-inner.svg",
  "layer-minus": "/icons/layer-minus.svg",
  "layer-plus": "/icons/layer-plus.svg",
  "layer-group": "/icons/layer-group.svg",
  "draw-square": "/icons/draw-square.svg",
  "draw-polygon": "/icons/draw-polygon.svg",
  "pen-line": "/icons/pen-line.svg",
  "draw-circle": "/icons/draw-circle.svg",
  "bars": "/icons/bars.svg",
  "ellipsis-vertical": "/icons/ellipsis-vertical.svg",
  "ellipsis": "/icons/ellipsis.svg",
  "location-plus": "/icons/location-plus.svg",
  "pin-viewfinder": "/icons/pin-viewfinder.svg",
  "house": "/icons/house.svg",
  // Map Mode Icons (Personalizados)
  "heatmap": "/icons/heatmap.svg",
  "street-view": "/icons/street-view.svg",
  // Map Mode Preview Images (Personalizados - JPG)
  "map-satelite": "/images/map-satelite.jpg",
  "map-gps": "/images/map-gps.jpg",
  "map-relevo": "/images/map-relevo.jpg",
}

// Export all icon components
export const ArrowUpFromBracket = createIcon("ArrowUpFromBracket", iconUrls["arrow-up-from-bracket"])
export const File = createIcon("File", iconUrls["file"])
export const CircleInfo = createIcon("CircleInfo", iconUrls["circle-info"])
export const Palette = createIcon("Palette", iconUrls["palette"])
export const Check = createIcon("Check", iconUrls["check"])
export const UsersRectangle = createIcon("UsersRectangle", iconUrls["users-rectangle"])
export const LockKeyhole = createIcon("LockKeyhole", iconUrls["lock-keyhole"])
export const Calendar = createIcon("Calendar", iconUrls["calendar"])
export const User = createIcon("User", iconUrls["user"])
export const AlignLeft = createIcon("AlignLeft", iconUrls["align-left"])
export const Clock = createIcon("Clock", iconUrls["clock"])
export const Copy = createIcon("Copy", iconUrls["copy"])
export const Sliders = createIcon("Sliders", iconUrls["sliders"])
export const Gear = createIcon("Gear", iconUrls["gear"])
export const ArrowUpFromSquare = createIcon("ArrowUpFromSquare", iconUrls["arrow-up-from-square"])
export const ShareNodes = createIcon("ShareNodes", iconUrls["share-nodes"])
export const Play = createIcon("Play", iconUrls["play"])
export const FloppyDisk = createIcon("FloppyDisk", iconUrls["floppy-disk"])
export const GripDotsVertical = createIcon("GripDotsVertical", iconUrls["grip-dots-vertical"])
export const GripDots = createIcon("GripDots", iconUrls["grip-dots"])
export const List = createIcon("List", iconUrls["list"])
export const Map = createIcon("Map", iconUrls["map"])
export const FileCircleInfo = createIcon("FileCircleInfo", iconUrls["file-circle-info"])
export const ListCollection = createIcon("ListCollection", iconUrls["list-collection"])
export const Bullseye = createIcon("Bullseye", iconUrls["bullseye"])
export const Eye = createIcon("Eye", iconUrls["eye"])
export const EyeSlash = createIcon("EyeSlash", iconUrls["eye-slash"])
export const Expand = createIcon("Expand", iconUrls["expand"])
export const ChevronRight = createIcon("ChevronRight", iconUrls["chevron-right"])
export const ChevronLeft = createIcon("ChevronLeft", iconUrls["chevron-left"])
export const ChevronUp = createIcon("ChevronUp", iconUrls["chevron-up"])
export const ChevronDown = createIcon("ChevronDown", iconUrls["chevron-down"])
export const CrosshairsSimple = createIcon("CrosshairsSimple", iconUrls["crosshairs-simple"])
export const Focus = createIcon("Focus", iconUrls["focus"])
export const LocationDot = createIcon("LocationDot", iconUrls["location-dot"])
export const Minus = createIcon("Minus", iconUrls["minus"])
export const Plus = createIcon("Plus", iconUrls["plus"])
export const RotateRight = createIcon("RotateRight", iconUrls["rotate-right"])
export const Trash = createIcon("Trash", iconUrls["trash"])
export const Filter = createIcon("Filter", iconUrls["filter"])
export const Ruler = createIcon("Ruler", iconUrls["ruler"])
export const ListTree = createIcon("ListTree", iconUrls["list-tree"])
export const Circle = createIcon("Circle", iconUrls["circle"])
export const ListTimeline = createIcon("ListTimeline", iconUrls["list-timeline"])
export const ListRadio = createIcon("ListRadio", iconUrls["list-radio"])
export const MagnifyingGlassLocation = createIcon("MagnifyingGlassLocation", iconUrls["magnifying-glass-location"])
export const FolderTree = createIcon("FolderTree", iconUrls["folder-tree"])
export const MagnifyingGlass = createIcon("MagnifyingGlass", iconUrls["magnifying-glass"])
export const Bell = createIcon("Bell", iconUrls["bell"])
export const ClipboardUser = createIcon("ClipboardUser", iconUrls["clipboard-user"])
export const CalendarLines = createIcon("CalendarLines", iconUrls["calendar-lines"])
export const Xmark = createIcon("Xmark", iconUrls["xmark"])
export const LocationCrosshairs = createIcon("LocationCrosshairs", iconUrls["location-crosshairs"])
export const ArrowDownToBracket = createIcon("ArrowDownToBracket", iconUrls["arrow-down-to-bracket"])
export const BorderInner = createIcon("BorderInner", iconUrls["border-inner"])
export const LayerMinus = createIcon("LayerMinus", iconUrls["layer-minus"])
export const LayerPlus = createIcon("LayerPlus", iconUrls["layer-plus"])
export const LayerGroup = createIcon("LayerGroup", iconUrls["layer-group"])
export const DrawSquare = createIcon("DrawSquare", iconUrls["draw-square"])
export const DrawPolygon = createIcon("DrawPolygon", iconUrls["draw-polygon"])
export const PenLine = createIcon("PenLine", iconUrls["pen-line"])
export const DrawCircle = createIcon("DrawCircle", iconUrls["draw-circle"])
export const Bars = createIcon("Bars", iconUrls["bars"])
export const EllipsisVertical = createIcon("EllipsisVertical", iconUrls["ellipsis-vertical"])
export const Ellipsis = createIcon("Ellipsis", iconUrls["ellipsis"])
export const LocationPlus = createIcon("LocationPlus", iconUrls["location-plus"])
export const PinViewfinder = createIcon("PinViewfinder", iconUrls["pin-viewfinder"])
export const House = createIcon("House", iconUrls["house"])
// Map Mode Icons (Personalizados)
export const Heatmap = createIcon("Heatmap", iconUrls["heatmap"])
export const StreetView = createIcon("StreetView", iconUrls["street-view"])
// Map Mode Preview Images (Personalizados - PNG)
export const MapSatelite = createIcon("MapSatelite", iconUrls["map-satelite"])
export const MapGps = createIcon("MapGps", iconUrls["map-gps"])
export const MapRelevo = createIcon("MapRelevo", iconUrls["map-relevo"])

// Icon registry for easy lookup
export const iconRegistry = {
  "arrow-up-from-bracket": ArrowUpFromBracket,
  "file": File,
  "circle-info": CircleInfo,
  "palette": Palette,
  "check": Check,
  "users-rectangle": UsersRectangle,
  "lock-keyhole": LockKeyhole,
  "calendar": Calendar,
  "user": User,
  "align-left": AlignLeft,
  "clock": Clock,
  "copy": Copy,
  "sliders": Sliders,
  "gear": Gear,
  "arrow-up-from-square": ArrowUpFromSquare,
  "share-nodes": ShareNodes,
  "play": Play,
  "floppy-disk": FloppyDisk,
  "grip-dots-vertical": GripDotsVertical,
  "grip-dots": GripDots,
  "list": List,
  "map": Map,
  "file-circle-info": FileCircleInfo,
  "list-collection": ListCollection,
  "bullseye": Bullseye,
  "eye": Eye,
  "eye-slash": EyeSlash,
  "expand": Expand,
  "chevron-right": ChevronRight,
  "chevron-left": ChevronLeft,
  "chevron-up": ChevronUp,
  "chevron-down": ChevronDown,
  "crosshairs-simple": CrosshairsSimple,
  "focus": Focus,
  "location-dot": LocationDot,
  "minus": Minus,
  "plus": Plus,
  "rotate-right": RotateRight,
  "trash": Trash,
  "filter": Filter,
  "ruler": Ruler,
  "list-tree": ListTree,
  "circle": Circle,
  "list-timeline": ListTimeline,
  "list-radio": ListRadio,
  "magnifying-glass-location": MagnifyingGlassLocation,
  "folder-tree": FolderTree,
  "magnifying-glass": MagnifyingGlass,
  "bell": Bell,
  "clipboard-user": ClipboardUser,
  "calendar-lines": CalendarLines,
  "xmark": Xmark,
  "location-crosshairs": LocationCrosshairs,
  "arrow-down-to-bracket": ArrowDownToBracket,
  "border-inner": BorderInner,
  "layer-minus": LayerMinus,
  "layer-plus": LayerPlus,
  "layer-group": LayerGroup,
  "draw-square": DrawSquare,
  "draw-polygon": DrawPolygon,
  "pen-line": PenLine,
  "draw-circle": DrawCircle,
  "bars": Bars,
  "ellipsis-vertical": EllipsisVertical,
  "ellipsis": Ellipsis,
  "location-plus": LocationPlus,
  "pin-viewfinder": PinViewfinder,
  "house": House,
  // Map Mode Icons (Personalizados)
  "heatmap": Heatmap,
  "street-view": StreetView,
  // Map Mode Preview Images (Personalizados - PNG)
  "map-satelite": MapSatelite,
  "map-gps": MapGps,
  "map-relevo": MapRelevo,
} as const

export type IconName = keyof typeof iconRegistry

// Dynamic icon component
export function Icon({ name, ...props }: IconProps & { name: IconName }) {
  const IconComponent = iconRegistry[name]
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`)
    return null
  }
  return <IconComponent {...props} />
}
