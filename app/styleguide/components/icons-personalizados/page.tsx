"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as Icons from "@/components/icons/icons"
import type { IconName } from "@/components/icons/icons"

export default function IconsPersonalizadosPage() {
  const [isDark, setIsDark] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSize, setSelectedSize] = useState<number>(18)

  // Ícones personalizados (Map Mode Icons e Preview Images)
  const personalizadosIcons: IconName[] = [
    "heatmap",
    "street-view",
    "map-satelite",
    "map-gps",
    "map-relevo",
  ]

  const filteredIcons = personalizadosIcons.filter((name) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Componente especial para ícones personalizados (ilustrações vetoriais e imagens PNG)
  const PersonalizadoIcon = ({ name, size }: { name: IconName; size: number }) => {
    const IconComponent = Icons.iconRegistry[name]
    if (!IconComponent) return null
    
    return <IconComponent size={size} />
  }

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Ícones Personalizados</h1>
              <p className="text-muted-foreground">
                Ícones customizados do design system, criados especificamente para o projeto
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
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Buscar ícone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Icons.MagnifyingGlass
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Tamanho:</span>
              <div className="flex gap-1">
                {[18, 24, 32].map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}px
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Icons Grid */}
          <Card>
            <CardHeader>
              <CardTitle>
                Ícones Personalizados ({filteredIcons.length})
              </CardTitle>
              <CardDescription>
                Ícones customizados criados especificamente para este projeto
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredIcons.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  Nenhum ícone encontrado com "{searchQuery}"
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {filteredIcons.map((name) => (
                    <div
                      key={name}
                      className="flex flex-col items-center gap-3 p-4 border rounded-lg bg-card hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center justify-center w-16 h-16 border rounded-md bg-background">
                        <PersonalizadoIcon name={name} size={selectedSize} />
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-medium">{name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Usage Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Exemplos de Uso</CardTitle>
              <CardDescription>
                Como usar os ícones personalizados no código
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">Import Individual</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`import { Heatmap, StreetView } from "@/components/icons"

function MyComponent() {
  return (
    <div>
      <Heatmap size={18} />
      <StreetView size={24} />
    </div>
  )
}`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Dynamic Icon</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`import { Icon, type IconName } from "@/components/icons"

function MyComponent() {
  const iconName: IconName = "heatmap"
  
  return <Icon name={iconName} size={18} />
}`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Nota sobre Cores</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    Os ícones personalizados são ilustrações vetoriais multicoloridas e mantêm suas cores originais. 
                    Eles não suportam alteração de cor via CSS, pois são ilustrações complexas com múltiplas cores.
                  </p>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`import { Heatmap, StreetView } from "@/components/icons"

// Os ícones mantêm suas cores originais
<Heatmap size={24} />
<StreetView size={24} />`}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Icons List */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Ícones Personalizados</CardTitle>
              <CardDescription>
                Todos os ícones personalizados disponíveis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {personalizadosIcons.map((name) => (
                  <div
                    key={name}
                    className="flex items-center gap-3 p-3 border rounded-lg bg-card"
                  >
                    <div className="flex items-center justify-center w-10 h-10 border rounded bg-background">
                      <PersonalizadoIcon name={name} size={selectedSize} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{name}</p>
                      <p className="text-xs text-muted-foreground">
                        {name === "heatmap" && "Ícone de mapa de calor multicolorido"}
                        {name === "street-view" && "Ícone de visualização de rua"}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {`<${name.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join("")} />`}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
