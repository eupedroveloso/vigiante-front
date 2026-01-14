"use client"

import { useState } from "react"
import { PrincipalBar } from "@/components/PrincipalBar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PrincipalBarPage() {
  const [isDark, setIsDark] = useState(false)

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Principal Bar</h1>
              <p className="text-muted-foreground">
                Barra de navegação principal com tabs, ferramentas e breadcrumb
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
                Componente PrincipalBar com todas as funcionalidades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <PrincipalBar />
              </div>
            </CardContent>
          </Card>

          {/* Variants */}
          <Card>
            <CardHeader>
              <CardTitle>Variantes</CardTitle>
              <CardDescription>
                Diferentes variantes do componente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">Default</h3>
                <div className="border rounded-lg overflow-hidden">
                  <PrincipalBar variant="default" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Code Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Exemplos de Código</CardTitle>
              <CardDescription>
                Como usar o componente PrincipalBar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">Import</h3>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`import { PrincipalBar } from "@/components/PrincipalBar"`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Uso Básico</h3>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`<PrincipalBar />`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Com Variante</h3>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`<PrincipalBar variant="default" />`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Com Classe Customizada</h3>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`<PrincipalBar className="custom-class" />`}</code>
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
                  <h3 className="text-sm font-semibold mb-2">variant</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    <strong>Tipo:</strong> <code>"default" | "form" | "form-edit" | "form-edit-select" | "nav-bar"</code>
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Padrão:</strong> <code>"default"</code>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Variante visual do componente
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
                Recursos do componente PrincipalBar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Tabs de navegação no topo</li>
                <li>Menu hamburger para navegação lateral</li>
                <li>Toggle entre modo Mapa e Formulários</li>
                <li>Ferramentas de mapa (localização, formas, camadas)</li>
                <li>Busca com ícone integrado</li>
                <li>Notificações</li>
                <li>Breadcrumb navegável</li>
                <li>Ações rápidas (calendário, clipboard, lista)</li>
                <li>Suporte a dark mode</li>
                <li>Totalmente responsivo</li>
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
                <li>Navegação por teclado em todos os elementos interativos</li>
                <li>ARIA labels apropriados</li>
                <li>Breadcrumb com navegação semântica</li>
                <li>Contraste adequado para leitura</li>
                <li>Foco visível em todos os elementos</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
