"use client"

import { useState } from "react"
import { ToggleModeTool, ToggleMode } from "@/components/ToggleModeTool"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ToggleModeToolPage() {
  const [isDark, setIsDark] = useState(false)
  const [mode, setMode] = useState<ToggleMode>("mapa")

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Toggle Mode Tool</h1>
              <p className="text-muted-foreground">
                Componente de toggle para alternar entre modo Mapa e Formulários
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

          {/* Basic Usage */}
          <Card>
            <CardHeader>
              <CardTitle>Uso Básico</CardTitle>
              <CardDescription>
                Componente ToggleModeTool com controle de estado
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <ToggleModeTool
                  mode={mode}
                  onModeChange={setMode}
                />
                <div className="text-sm text-muted-foreground">
                  Modo atual: <strong className="text-foreground">{mode}</strong>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sizes */}
          <Card>
            <CardHeader>
              <CardTitle>Tamanhos</CardTitle>
              <CardDescription>
                Diferentes tamanhos do componente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">Small</h3>
                <ToggleModeTool mode="mapa" size="sm" />
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Medium (padrão)</h3>
                <ToggleModeTool mode="mapa" size="md" />
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Large</h3>
                <ToggleModeTool mode="mapa" size="lg" />
              </div>
            </CardContent>
          </Card>

          {/* States */}
          <Card>
            <CardHeader>
              <CardTitle>Estados</CardTitle>
              <CardDescription>
                Diferentes estados do componente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">Modo Mapa Ativo</h3>
                <ToggleModeTool mode="mapa" />
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Modo Formulários Ativo</h3>
                <ToggleModeTool mode="formularios" />
              </div>
            </CardContent>
          </Card>

          {/* Interactive Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Demo Interativo</CardTitle>
              <CardDescription>
                Teste a funcionalidade do toggle
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <ToggleModeTool
                  mode={mode}
                  onModeChange={setMode}
                />
                <div className="flex gap-2">
                  <Button
                    onClick={() => setMode("mapa")}
                    variant={mode === "mapa" ? "default" : "outline"}
                    size="sm"
                  >
                    Definir Mapa
                  </Button>
                  <Button
                    onClick={() => setMode("formularios")}
                    variant={mode === "formularios" ? "default" : "outline"}
                    size="sm"
                  >
                    Definir Formulários
                  </Button>
                </div>
              </div>
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm">
                  <strong>Modo selecionado:</strong> {mode === "mapa" ? "Mapa" : "Formulários"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Code Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Exemplos de Código</CardTitle>
              <CardDescription>
                Como usar o componente ToggleModeTool
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">Import</h3>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`import { ToggleModeTool, ToggleMode } from "@/components/ToggleModeTool"`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Uso Básico</h3>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`const [mode, setMode] = useState<ToggleMode>("mapa")

<ToggleModeTool
  mode={mode}
  onModeChange={setMode}
/>`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Com Tamanho Customizado</h3>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`<ToggleModeTool
  mode={mode}
  onModeChange={setMode}
  size="lg"
/>`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Sem Callback (Controlled)</h3>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`<ToggleModeTool mode="mapa" />`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Props */}
          <Card>
            <CardHeader>
              <CardTitle>Props</CardTitle>
              <CardDescription>
                Propriedades disponíveis do componente
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
                  <h3 className="text-sm font-semibold mb-2">mode</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    <strong>Tipo:</strong> <code>"mapa" | "formularios"</code>
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Padrão:</strong> <code>"mapa"</code>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Modo atualmente selecionado
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2">onModeChange</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    <strong>Tipo:</strong> <code>(mode: ToggleMode) =&gt; void</code>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Callback chamado quando o modo é alterado
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2">size</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    <strong>Tipo:</strong> <code>"sm" | "md" | "lg"</code>
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Padrão:</strong> <code>"md"</code>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tamanho do componente
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
                Recursos do componente ToggleModeTool
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Alternância entre modo Mapa e Formulários</li>
                <li>Ícones visuais (MapPin e List)</li>
                <li>Estados visuais distintos (ativo/inativo)</li>
                <li>Três tamanhos disponíveis (sm, md, lg)</li>
                <li>Callback para mudança de modo</li>
                <li>Controle total do estado (controlled component)</li>
                <li>Navegação por teclado</li>
                <li>Suporte a dark mode</li>
                <li>Totalmente acessível (ARIA labels)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Accessibility */}
          <Card>
            <CardHeader>
              <CardTitle>Acessibilidade</CardTitle>
              <CardDescription>
                Recursos de acessibilidade implementados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Navegação por teclado (Tab, Enter, Space)</li>
                <li>ARIA labels apropriados (aria-label, aria-pressed)</li>
                <li>Contraste adequado para leitura</li>
                <li>Foco visível em todos os elementos</li>
                <li>Suporte a leitores de tela</li>
                <li>Estados semânticos (aria-pressed)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
