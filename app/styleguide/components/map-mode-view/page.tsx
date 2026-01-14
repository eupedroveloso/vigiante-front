"use client"

import { useState } from "react"
import { MapModeView, MapViewMode } from "@/components/MapModeView"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function MapModeViewPage() {
  const [isDark, setIsDark] = useState(false)
  const [currentMode, setCurrentMode] = useState<MapViewMode>("satelite")

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Map Mode View</h1>
              <p className="text-muted-foreground">
                Componente para alternar entre visualizações do mapa (Satélite, GPS, Relevo)
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

          {/* Usage */}
          <Card>
            <CardHeader>
              <CardTitle>Uso Básico</CardTitle>
              <CardDescription>
                Componente MapModeView com todas as funcionalidades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-8 border rounded-lg">
                <MapModeView
                  mode={currentMode}
                  onModeChange={setCurrentMode}
                />
                <div className="text-sm text-muted-foreground">
                  Modo atual: <span className="font-semibold text-foreground">{currentMode}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Variants */}
          <Card>
            <CardHeader>
              <CardTitle>Modos Disponíveis</CardTitle>
              <CardDescription>
                Todos os modos de visualização disponíveis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Satélite</h3>
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <MapModeView mode="satelite" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">GPS</h3>
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <MapModeView mode="gps" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Relevo</h3>
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <MapModeView mode="relevo" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Demo Interativo</CardTitle>
              <CardDescription>
                Teste a expansão no hover e a mudança de modo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-8 border rounded-lg bg-muted/50">
                  <MapModeView
                    mode={currentMode}
                    onModeChange={setCurrentMode}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={currentMode === "satelite" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentMode("satelite")}
                  >
                    Satélite
                  </Button>
                  <Button
                    variant={currentMode === "gps" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentMode("gps")}
                  >
                    GPS
                  </Button>
                  <Button
                    variant={currentMode === "relevo" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentMode("relevo")}
                  >
                    Relevo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documentation */}
          <Card>
            <CardHeader>
              <CardTitle>Documentação</CardTitle>
              <CardDescription>
                Como usar o componente MapModeView
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">Import</h3>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`import { MapModeView, MapViewMode } from "@/components/MapModeView"`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Uso Básico</h3>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`<MapModeView
  mode="satelite"
  onModeChange={(mode) => console.log(mode)}
/>`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Com Estado</h3>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`const [mode, setMode] = useState<MapViewMode>("satelite")

<MapModeView
  mode={mode}
  onModeChange={setMode}
/>`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Props</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <code className="bg-muted px-2 py-1 rounded">className?: string</code>
                    <p className="text-muted-foreground mt-1">
                      Classe CSS adicional para o container
                    </p>
                  </div>
                  <div>
                    <code className="bg-muted px-2 py-1 rounded">mode?: MapViewMode</code>
                    <p className="text-muted-foreground mt-1">
                      Modo de visualização atual. Valores: "satelite" | "gps" | "relevo"
                    </p>
                  </div>
                  <div>
                    <code className="bg-muted px-2 py-1 rounded">onModeChange?: (mode: MapViewMode) =&gt; void</code>
                    <p className="text-muted-foreground mt-1">
                      Callback chamado quando o modo é alterado
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Comportamento</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Expande horizontalmente da direita para esquerda no hover</li>
                  <li>Mostra apenas o botão ativo quando não está em hover</li>
                  <li>Animação suave de 300ms</li>
                  <li>O botão ativo tem background diferente (bg-accent)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
