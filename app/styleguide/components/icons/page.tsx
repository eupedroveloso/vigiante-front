"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as Icons from "@/components/icons/icons"
import type { IconName } from "@/components/icons/icons"

// Função para carregar SVG
async function loadSVG(src: string): Promise<string> {
  try {
    const response = await fetch(src)
    if (!response.ok) {
      throw new Error(`Failed to load SVG: ${src}`)
    }
    return await response.text()
  } catch (error) {
    console.error(`Erro ao carregar SVG: ${src}`, error)
    return ""
  }
}

// Função para modificar SVG com cor e tamanho
function modifySVG(svgContent: string, color: string, size: number): string {
  let modified = svgContent
  
  // Substituir fill="currentColor" ou fill="none" por fill com a cor especificada em todos os elementos
  modified = modified
    .replace(/fill="currentColor"/gi, `fill="${color}"`)
    .replace(/fill="none"/gi, `fill="${color}"`)
    .replace(/fill='currentColor'/gi, `fill='${color}'`)
    .replace(/fill='none'/gi, `fill='${color}'`)
  
  // Adicionar fill em elementos path, circle, rect, polygon, etc. que não têm fill
  const elementsWithoutFill = ['<path', '<circle', '<rect', '<polygon', '<polyline', '<ellipse', '<line']
  elementsWithoutFill.forEach((element) => {
    // Regex para encontrar elementos sem atributo fill
    const regex = new RegExp(`(${element}[^>]*?)(?!fill=)(>)`, 'gi')
    modified = modified.replace(regex, (match, p1, p2) => {
      // Se já tem fill, não adicionar
      if (p1.includes('fill=')) return match
      // Adicionar fill antes do >
      return `${p1} fill="${color}"${p2}`
    })
  })
  
  // Atualizar width e height no elemento SVG
  modified = modified
    .replace(/<svg([^>]*?)width="[^"]*"/gi, `<svg$1width="${size}"`)
    .replace(/<svg([^>]*?)height="[^"]*"/gi, `<svg$1height="${size}"`)
    .replace(/<svg([^>]*?)width='[^']*'/gi, `<svg$1width='${size}'`)
    .replace(/<svg([^>]*?)height='[^']*'/gi, `<svg$1height='${size}'`)
  
  // Se não tem width/height, adicionar
  if (!/<svg[^>]*width=/i.test(modified)) {
    modified = modified.replace(/<svg([^>]*?)>/i, `<svg$1 width="${size}" height="${size}">`)
  }
  
  return modified
}

// Função para baixar SVG
function downloadSVG(svgContent: string, filename: string) {
  const blob = new Blob([svgContent], { type: "image/svg+xml" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `${filename}.svg`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default function IconsPage() {
  const [isDark, setIsDark] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSize, setSelectedSize] = useState<number>(16)
  const [editingIcon, setEditingIcon] = useState<IconName | null>(null)
  const [iconColor, setIconColor] = useState<string>("#000000")
  const [iconSize, setIconSize] = useState<number>(24)
  const [svgContent, setSvgContent] = useState<string>("")
  const [modifiedSvg, setModifiedSvg] = useState<string>("")

  const iconNames: IconName[] = [
    "arrow-up-from-bracket",
    "file",
    "circle-info",
    "palette",
    "check",
    "users-rectangle",
    "lock-keyhole",
    "calendar",
    "user",
    "align-left",
    "clock",
    "copy",
    "sliders",
    "gear",
    "arrow-up-from-square",
    "share-nodes",
    "play",
    "floppy-disk",
    "grip-dots-vertical",
    "grip-dots",
    "list",
    "map",
    "file-circle-info",
    "list-collection",
    "bullseye",
    "eye",
    "eye-slash",
    "expand",
    "chevron-right",
    "chevron-left",
    "chevron-up",
    "chevron-down",
    "crosshairs-simple",
    "focus",
    "location-dot",
    "minus",
    "plus",
    "rotate-right",
    "trash",
    "filter",
    "ruler",
    "list-tree",
    "circle",
    "list-timeline",
    "list-radio",
    "magnifying-glass-location",
    "folder-tree",
    "magnifying-glass",
    "bell",
    "clipboard-user",
    "calendar-lines",
    "xmark",
    "location-crosshairs",
    "arrow-down-to-bracket",
    "border-inner",
    "layer-minus",
    "layer-plus",
    "layer-group",
    "draw-square",
    "draw-polygon",
    "pen-line",
    "draw-circle",
    "bars",
    "ellipsis-vertical",
    "ellipsis",
    "location-plus",
    "pin-viewfinder",
  ]

  const filteredIcons = iconNames.filter((name) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const IconComponent = ({ name }: { name: IconName }) => {
    const Icon = Icons.iconRegistry[name]
    if (!Icon) return null
    return <Icon size={selectedSize} />
  }

  // Carregar SVG quando abrir modal de edição
  useEffect(() => {
    if (editingIcon) {
      const iconUrl = Icons.iconUrls[editingIcon]
      const isSvg = iconUrl && iconUrl.toLowerCase().endsWith('.svg')
      if (isSvg) {
        loadSVG(iconUrl).then((content) => {
          if (content) {
            setSvgContent(content)
            const modified = modifySVG(content, iconColor, iconSize)
            setModifiedSvg(modified)
          }
        })
      } else {
        // Se não for SVG, limpar estados
        setSvgContent("")
        setModifiedSvg("")
      }
    }
  }, [editingIcon])

  // Atualizar SVG modificado quando cor ou tamanho mudar
  useEffect(() => {
    if (svgContent && editingIcon) {
      const modified = modifySVG(svgContent, iconColor, iconSize)
      setModifiedSvg(modified)
    }
  }, [iconColor, iconSize, svgContent, editingIcon])

  const handleIconClick = (name: IconName) => {
    setEditingIcon(name)
    setIconSize(24)
    setIconColor("#000000")
  }

  const handleDownload = () => {
    if (editingIcon && modifiedSvg) {
      downloadSVG(modifiedSvg, editingIcon)
    }
  }

  const handleCopySVG = async () => {
    if (modifiedSvg) {
      try {
        await navigator.clipboard.writeText(modifiedSvg)
        // Mostrar feedback visual (opcional)
        alert("SVG copiado para a área de transferência!")
      } catch (error) {
        console.error("Erro ao copiar SVG:", error)
        alert("Erro ao copiar SVG. Tente novamente.")
      }
    }
  }

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Biblioteca de Ícones</h1>
              <p className="text-muted-foreground">
                Ícones personalizados do design system
              </p>
            </div>
            <Button
              onClick={() => {
                setIsDark(!isDark)
                if (!isDark) {
                  document.documentElement.classList.add("dark")
                } else {
                  document.documentElement.classList.remove("dark")
                }
              }}
              variant="outline"
            >
              {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </Button>
          </div>

          {/* Search and Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Controles</CardTitle>
              <CardDescription>
                Busque e ajuste o tamanho dos ícones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 items-center">
                <div className="flex-1">
                  <Input
                    placeholder="Buscar ícone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <label className="text-sm text-muted-foreground">Tamanho:</label>
                  <div className="flex gap-2">
                    <Button
                      variant={selectedSize === 16 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(16)}
                    >
                      16px
                    </Button>
                    <Button
                      variant={selectedSize === 24 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(24)}
                    >
                      24px
                    </Button>
                    <Button
                      variant={selectedSize === 32 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(32)}
                    >
                      32px
                    </Button>
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {filteredIcons.length} ícone{filteredIcons.length !== 1 ? "s" : ""} encontrado{filteredIcons.length !== 1 ? "s" : ""}
              </div>
            </CardContent>
          </Card>

          {/* Icons Grid */}
          <Card>
            <CardHeader>
              <CardTitle>Todos os Ícones</CardTitle>
              <CardDescription>
                Clique em um ícone para editar e baixar o SVG modificado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-6">
                {filteredIcons.map((name) => {
                  const Icon = Icons.iconRegistry[name]
                  return (
                    <div
                      key={name}
                      className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-muted cursor-pointer transition-colors"
                      onClick={() => handleIconClick(name)}
                      title={`Clique para editar: ${name}`}
                    >
                      {Icon && <Icon size={selectedSize} />}
                      <span className="text-xs text-center text-muted-foreground break-all">
                        {name}
                      </span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Usage Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Exemplos de Uso</CardTitle>
              <CardDescription>
                Como usar os ícones no projeto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">Import Individual</h3>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`import { Map, List, Bell } from "@/components/icons"

<Map size={16} />
<List size={24} />
<Bell size={32} />`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Import All</h3>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`import * as Icons from "@/components/icons"

<Icons.Map size={16} />
<Icons.List size={24} />`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Dynamic Icon</h3>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`import { Icon, type IconName } from "@/components/icons"

const iconName: IconName = "map"

<Icon name={iconName} size={16} />`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Com Classes Customizadas</h3>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`import { Map } from "@/components/icons"

<Map 
  size={24} 
  className="text-primary" 
/>`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Categorias</CardTitle>
              <CardDescription>
                Ícones organizados por categoria
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-3">Navegação</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <Icons.ChevronRight size={24} />
                    <span className="text-xs">chevron-right</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icons.ChevronLeft size={24} />
                    <span className="text-xs">chevron-left</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icons.ChevronUp size={24} />
                    <span className="text-xs">chevron-up</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icons.ChevronDown size={24} />
                    <span className="text-xs">chevron-down</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icons.Expand size={24} />
                    <span className="text-xs">expand</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3">Ações</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <Icons.Plus size={24} />
                    <span className="text-xs">plus</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icons.Minus size={24} />
                    <span className="text-xs">minus</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icons.Trash size={24} />
                    <span className="text-xs">trash</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icons.Copy size={24} />
                    <span className="text-xs">copy</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icons.Check size={24} />
                    <span className="text-xs">check</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icons.Xmark size={24} />
                    <span className="text-xs">xmark</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3">Localização</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <Icons.Map size={24} />
                    <span className="text-xs">map</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icons.LocationDot size={24} />
                    <span className="text-xs">location-dot</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icons.LocationPlus size={24} />
                    <span className="text-xs">location-plus</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icons.LocationCrosshairs size={24} />
                    <span className="text-xs">location-crosshairs</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icons.MagnifyingGlassLocation size={24} />
                    <span className="text-xs">magnifying-glass-location</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3">Ferramentas de Desenho</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <Icons.DrawCircle size={24} />
                    <span className="text-xs">draw-circle</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icons.DrawSquare size={24} />
                    <span className="text-xs">draw-square</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icons.DrawPolygon size={24} />
                    <span className="text-xs">draw-polygon</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icons.PenLine size={24} />
                    <span className="text-xs">pen-line</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icons.Ruler size={24} />
                    <span className="text-xs">ruler</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3">Camadas</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <Icons.LayerGroup size={24} />
                    <span className="text-xs">layer-group</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icons.LayerPlus size={24} />
                    <span className="text-xs">layer-plus</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icons.LayerMinus size={24} />
                    <span className="text-xs">layer-minus</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icons.BorderInner size={24} />
                    <span className="text-xs">border-inner</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Props Documentation */}
          <Card>
            <CardHeader>
              <CardTitle>Props</CardTitle>
              <CardDescription>
                Propriedades disponíveis para todos os ícones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold mb-2">className</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    <strong>Tipo:</strong> <code>string</code>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Classes CSS adicionais para personalização
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2">size</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    <strong>Tipo:</strong> <code>number | string</code>
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Padrão:</strong> <code>16</code>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tamanho do ícone em pixels (número) ou qualquer valor CSS válido (string)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Funcionalidades</CardTitle>
              <CardDescription>
                Recursos da biblioteca de ícones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>65+ ícones personalizados do design system</li>
                <li>Tamanho customizável (number ou string)</li>
                <li>Classes CSS personalizáveis</li>
                <li>Import individual ou em lote</li>
                <li>Componente dinâmico para uso programático</li>
                <li>TypeScript com tipos completos</li>
                <li>Otimizado para performance (lazy loading)</li>
                <li>100% compatível com o design system</li>
                <li>Fácil de estender com novos ícones</li>
              </ul>
            </CardContent>
          </Card>

          {/* Modal de Edição */}
          {editingIcon && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Editar Ícone: {editingIcon}</CardTitle>
                  <CardDescription>
                    Personalize a cor e o tamanho do ícone e baixe o SVG modificado
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Preview */}
                  <div className="flex items-center justify-center p-8 bg-muted rounded-lg min-h-[200px]">
                    {modifiedSvg ? (
                      <div 
                        dangerouslySetInnerHTML={{ __html: modifiedSvg }}
                        className="flex items-center justify-center"
                      />
                    ) : Icons.iconUrls[editingIcon]?.toLowerCase().endsWith('.svg') ? (
                      <div className="text-muted-foreground">Carregando...</div>
                    ) : (
                      <div className="text-muted-foreground text-center">
                        Este ícone é uma imagem (JPG/PNG) e não pode ser editado como SVG.
                        <br />
                        Apenas ícones SVG podem ser personalizados.
                      </div>
                    )}
                  </div>

                  {/* Controles de Cor */}
                  <div className="space-y-2">
                    <Label htmlFor="color-picker">Cor</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        id="color-picker"
                        type="color"
                        value={iconColor}
                        onChange={(e) => setIconColor(e.target.value)}
                        className="w-20 h-10 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={iconColor}
                        onChange={(e) => setIconColor(e.target.value)}
                        placeholder="#000000"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  {/* Controles de Tamanho */}
                  <div className="space-y-2">
                    <Label htmlFor="size-input">Tamanho (px)</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        id="size-input"
                        type="number"
                        min="8"
                        max="512"
                        step="1"
                        value={iconSize}
                        onChange={(e) => setIconSize(Number(e.target.value))}
                        className="flex-1"
                      />
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIconSize(Math.max(8, iconSize - 8))}
                        >
                          -8
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIconSize(Math.min(512, iconSize + 8))}
                        >
                          +8
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Botões de Ação */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setEditingIcon(null)
                        setSvgContent("")
                        setModifiedSvg("")
                      }}
                    >
                      Fechar
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCopySVG}
                      disabled={!modifiedSvg || !Icons.iconUrls[editingIcon]?.toLowerCase().endsWith('.svg')}
                    >
                      Copiar SVG
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={handleDownload}
                      disabled={!modifiedSvg || !Icons.iconUrls[editingIcon]?.toLowerCase().endsWith('.svg')}
                    >
                      Baixar SVG
                    </Button>
                  </div>

                  {/* Preview do código */}
                  {modifiedSvg && (
                    <div className="space-y-2">
                      <Label>Preview do SVG</Label>
                      <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto max-h-40">
                        <code>{modifiedSvg.substring(0, 200)}...</code>
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
