"use client"

import { useState } from "react"
import { MapTools, MapTool } from "@/components/MapTools"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LocationPlus,
  BorderInner,
  DrawPolygon,
  Circle,
  LayerGroup,
} from "@/components/icons"

export default function MapToolsShowcasePage() {
  const [isDark, setIsDark] = useState(false)
  const [activeTool, setActiveTool] = useState("location-plus")

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const customTools: MapTool[] = [
    {
      id: "location-plus",
      icon: <LocationPlus size={18} />,
      label: "Adicionar localização",
    },
    {
      id: "border-inner",
      icon: <BorderInner size={18} />,
      label: "Grade",
    },
    {
      id: "draw-polygon",
      icon: <DrawPolygon size={18} />,
      label: "Desenhar polígono",
    },
    {
      id: "circle",
      icon: <Circle size={18} />,
      label: "Desenhar círculo",
    },
    {
      id: "layer-group",
      icon: <LayerGroup size={18} />,
      label: "Camadas",
    },
  ]

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Map Tools</h1>
          <p className="text-muted-foreground text-lg">
            Barra de ferramentas para interação com mapas, incluindo desenho de formas e gerenciamento de camadas.
          </p>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Basic Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Uso Básico</CardTitle>
            <CardDescription>
              Componente padrão com todas as ferramentas de mapa.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg bg-card">
              <MapTools
                activeToolId={activeTool}
                onToolChange={setActiveTool}
              />
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                <code>{`import { MapTools } from "@/components/MapTools"

const [activeTool, setActiveTool] = useState("location-plus")

<MapTools
  activeToolId={activeTool}
  onToolChange={setActiveTool}
/>`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Custom Tools */}
        <Card>
          <CardHeader>
            <CardTitle>Ferramentas Customizadas</CardTitle>
            <CardDescription>
              Defina suas próprias ferramentas passando um array de MapTool.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg bg-card">
              <MapTools
                activeToolId={activeTool}
                onToolChange={setActiveTool}
                tools={customTools}
              />
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                <code>{`import { MapTools, MapTool } from "@/components/MapTools"
import { LocationPlus, BorderInner } from "@/components/icons"

const customTools: MapTool[] = [
  {
    id: "location-plus",
    icon: <LocationPlus size={18} />,
    label: "Adicionar localização",
  },
  {
    id: "border-inner",
    icon: <BorderInner size={18} />,
    label: "Grade",
  },
]

<MapTools
  activeToolId={activeTool}
  onToolChange={setActiveTool}
  tools={customTools}
/>`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* States */}
        <Card>
          <CardHeader>
            <CardTitle>Estados</CardTitle>
            <CardDescription>
              Diferentes estados das ferramentas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">Ferramenta Ativa</h3>
                <div className="p-4 border rounded-lg bg-card">
                  <MapTools activeToolId="location-plus" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Ferramenta Inativa</h3>
                <div className="p-4 border rounded-lg bg-card">
                  <MapTools activeToolId="border-inner" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Props Documentation */}
        <Card>
          <CardHeader>
            <CardTitle>Documentação</CardTitle>
            <CardDescription>
              Props e tipos disponíveis.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">MapToolsProps</h3>
                <div className="bg-muted p-3 rounded text-sm">
                  <code>{`interface MapToolsProps {
  className?: string
  activeToolId?: string
  onToolChange?: (toolId: string) => void
  tools?: MapTool[]
}`}</code>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">MapTool</h3>
                <div className="bg-muted p-3 rounded text-sm">
                  <code>{`interface MapTool {
  id: string
  icon: React.ReactNode
  label?: string
  active?: boolean
  onClick?: () => void
}`}</code>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Props</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li><code>className</code> - Classes CSS adicionais para o container</li>
                  <li><code>activeToolId</code> - ID da ferramenta atualmente ativa</li>
                  <li><code>onToolChange</code> - Callback chamado quando uma ferramenta é clicada</li>
                  <li><code>tools</code> - Array de ferramentas customizadas (usa padrão se não fornecido)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accessibility */}
        <Card>
          <CardHeader>
            <CardTitle>Acessibilidade</CardTitle>
            <CardDescription>
              O componente segue as melhores práticas de acessibilidade.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Cada botão tem <code>aria-label</code> baseado no <code>label</code> ou <code>id</code> da ferramenta</li>
              <li>Atributo <code>title</code> para tooltips nativos</li>
              <li>Navegação por teclado suportada através do componente Button</li>
              <li>Estados visuais claros para ferramenta ativa/inativa</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
