"use client"

import { useState } from "react"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, ChevronDown } from "@/components/icons"
import Link from "next/link"

export default function BreadcrumbShowcasePage() {
  const [isDark, setIsDark] = useState(false)

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Breadcrumb</h1>
          <p className="text-muted-foreground text-lg">
            Componente de navegação hierárquica que mostra o caminho atual na estrutura do site.
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
              Exemplo simples de breadcrumb com links e separadores.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg bg-card">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight size={18} className="text-muted-foreground" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/docs">Documentação</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight size={18} className="text-muted-foreground" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                <code>{`import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ChevronRight } from "@/components/icons"
import Link from "next/link"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link href="/">Home</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <ChevronRight size={18} className="text-muted-foreground" />
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link href="/docs">Documentação</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <ChevronRight size={18} className="text-muted-foreground" />
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* With Ellipsis */}
        <Card>
          <CardHeader>
            <CardTitle>Com Ellipsis</CardTitle>
            <CardDescription>
              Use BreadcrumbEllipsis para ocultar itens intermediários quando há muitos níveis.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg bg-card">
              <Breadcrumb>
                <BreadcrumbList className="gap-1.5">
                  <BreadcrumbItem>
                    <BreadcrumbLink className="text-xs text-muted-foreground">
                      Projetos
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight size={18} className="text-muted-foreground" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbEllipsis className="h-9 w-9" />
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight size={18} className="text-muted-foreground" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink className="text-xs text-foreground flex items-center gap-1">
                      Focos de Dengue - Brasília
                      <ChevronDown size={18} className="text-muted-foreground" />
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight size={18} className="text-muted-foreground" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-xs text-foreground">
                      Teste
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                <code>{`<Breadcrumb>
  <BreadcrumbList className="gap-1.5">
    <BreadcrumbItem>
      <BreadcrumbLink className="text-xs text-muted-foreground">
        Projetos
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <ChevronRight size={18} className="text-muted-foreground" />
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbEllipsis className="h-9 w-9" />
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <ChevronRight size={18} className="text-muted-foreground" />
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbLink className="text-xs text-foreground flex items-center gap-1">
        Focos de Dengue - Brasília
        <ChevronDown size={18} className="text-muted-foreground" />
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <ChevronRight size={18} className="text-muted-foreground" />
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbPage className="text-xs text-foreground">
        Teste
      </BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Long Path */}
        <Card>
          <CardHeader>
            <CardTitle>Caminho Longo</CardTitle>
            <CardDescription>
              Exemplo com múltiplos níveis de navegação.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg bg-card">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight size={18} className="text-muted-foreground" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/projetos">Projetos</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight size={18} className="text-muted-foreground" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/projetos/brasilia">Brasília</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight size={18} className="text-muted-foreground" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/projetos/brasilia/dengue">Focos de Dengue</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight size={18} className="text-muted-foreground" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Relatório Mensal</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </CardContent>
        </Card>

        {/* Props Documentation */}
        <Card>
          <CardHeader>
            <CardTitle>Documentação</CardTitle>
            <CardDescription>
              Componentes e props disponíveis.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Breadcrumb</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Componente raiz que envolve toda a estrutura do breadcrumb.
                </p>
                <div className="bg-muted p-3 rounded text-sm">
                  <code>{`React.ComponentProps<"nav">`}</code>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">BreadcrumbList</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Container para os itens do breadcrumb. Aceita className para customização.
                </p>
                <div className="bg-muted p-3 rounded text-sm">
                  <code>{`React.ComponentProps<"ol">`}</code>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">BreadcrumbItem</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Item individual do breadcrumb. Aceita className para customização.
                </p>
                <div className="bg-muted p-3 rounded text-sm">
                  <code>{`React.ComponentProps<"li">`}</code>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">BreadcrumbLink</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Link clicável no breadcrumb. Use <code>asChild</code> para renderizar como componente filho.
                </p>
                <div className="bg-muted p-3 rounded text-sm">
                  <code>{`React.ComponentProps<"a"> & { asChild?: boolean }`}</code>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">BreadcrumbPage</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Página atual (não clicável). Aceita className para customização.
                </p>
                <div className="bg-muted p-3 rounded text-sm">
                  <code>{`React.ComponentProps<"span">`}</code>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">BreadcrumbSeparator</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Separador entre itens. Aceita children para customizar o ícone.
                </p>
                <div className="bg-muted p-3 rounded text-sm">
                  <code>{`React.ComponentProps<"li"> & { children?: React.ReactNode }`}</code>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">BreadcrumbEllipsis</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Indicador de itens ocultos. Aceita className para customização.
                </p>
                <div className="bg-muted p-3 rounded text-sm">
                  <code>{`React.ComponentProps<"span">`}</code>
                </div>
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
              <li>Usa <code>nav</code> com <code>aria-label="breadcrumb"</code></li>
              <li>Usa <code>ol</code> para estrutura semântica de lista ordenada</li>
              <li>Página atual marcada com <code>aria-current="page"</code></li>
              <li>Separadores marcados com <code>aria-hidden="true"</code></li>
              <li>Ellipsis inclui <code>sr-only</code> para leitores de tela</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
