"use client"

import { useState } from "react"
import { ProjectTab, ProjectTabItem } from "@/components/ProjectTab"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ProjectTabPage() {
  const [isDark, setIsDark] = useState(false)
  const [activeTab, setActiveTab] = useState("tab-1")

  const defaultTabs: ProjectTabItem[] = [
    {
      id: "tab-1",
      label: "Colaboratório",
      onClose: () => console.log("Close tab 1"),
    },
    {
      id: "tab-2",
      label: "Colaboratório",
      onClose: () => console.log("Close tab 2"),
    },
    {
      id: "tab-3",
      label: "Colaboratório",
      onClose: () => console.log("Close tab 3"),
    },
  ]

  const [tabs, setTabs] = useState<ProjectTabItem[]>(defaultTabs)

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  const handleCloseTab = (tabId: string) => {
    setTabs((prev) => prev.filter((tab) => tab.id !== tabId))
    if (activeTab === tabId && tabs.length > 1) {
      const remainingTabs = tabs.filter((tab) => tab.id !== tabId)
      setActiveTab(remainingTabs[0]?.id || "")
    }
  }

  const handleAddTab = () => {
    const newTab: ProjectTabItem = {
      id: `tab-${Date.now()}`,
      label: "Colaboratório",
      onClose: () => handleCloseTab(`tab-${Date.now()}`),
    }
    setTabs((prev) => [...prev, newTab])
    setActiveTab(newTab.id)
  }

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Project Tab</h1>
              <p className="text-muted-foreground">
                Componente de tabs para projetos com botão home e fechamento de abas
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
                Componente ProjectTab com tabs padrão
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden bg-card-foreground">
                <ProjectTab
                  tabs={defaultTabs}
                  activeTabId={activeTab}
                  onTabChange={handleTabChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Interactive Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Demo Interativo</CardTitle>
              <CardDescription>
                Adicione e remova tabs dinamicamente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={handleAddTab} size="sm">
                  Adicionar Tab
                </Button>
                <Button
                  onClick={() => setTabs(defaultTabs)}
                  variant="outline"
                  size="sm"
                >
                  Resetar
                </Button>
              </div>
              <div className="border rounded-lg overflow-hidden bg-card-foreground">
                <ProjectTab
                  tabs={tabs.map((tab) => ({
                    ...tab,
                    onClose: () => handleCloseTab(tab.id),
                  }))}
                  activeTabId={activeTab}
                  onTabChange={handleTabChange}
                />
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
                <h3 className="text-sm font-semibold mb-2">Tab Ativa</h3>
                <div className="border rounded-lg overflow-hidden bg-card-foreground">
                  <ProjectTab
                    tabs={[
                      {
                        id: "active",
                        label: "Colaboratório",
                        onClose: () => {},
                      },
                    ]}
                    activeTabId="active"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Tabs Inativas</h3>
                <div className="border rounded-lg overflow-hidden bg-card-foreground">
                  <ProjectTab
                    tabs={[
                      {
                        id: "inactive-1",
                        label: "Colaboratório",
                        onClose: () => {},
                      },
                      {
                        id: "inactive-2",
                        label: "Colaboratório",
                        onClose: () => {},
                      },
                    ]}
                    activeTabId="inactive-1"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Múltiplas Tabs</h3>
                <div className="border rounded-lg overflow-hidden bg-card-foreground">
                  <ProjectTab
                    tabs={[
                      {
                        id: "multi-1",
                        label: "Colaboratório",
                        onClose: () => {},
                      },
                      {
                        id: "multi-2",
                        label: "Colaboratório",
                        onClose: () => {},
                      },
                      {
                        id: "multi-3",
                        label: "Colaboratório",
                        onClose: () => {},
                      },
                      {
                        id: "multi-4",
                        label: "Colaboratório",
                        onClose: () => {},
                      },
                    ]}
                    activeTabId="multi-3"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Code Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Exemplos de Código</CardTitle>
              <CardDescription>
                Como usar o componente ProjectTab
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">Import</h3>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`import { ProjectTab, ProjectTabItem } from "@/components/ProjectTab"`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Uso Básico</h3>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`const tabs: ProjectTabItem[] = [
  {
    id: "tab-1",
    label: "Colaboratório",
    onClose: () => console.log("Close tab"),
  },
]

<ProjectTab
  tabs={tabs}
  activeTabId="tab-1"
  onTabChange={(tabId) => console.log(tabId)}
/>`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Com Home Click</h3>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`<ProjectTab
  tabs={tabs}
  activeTabId="tab-1"
  onTabChange={handleTabChange}
  onHomeClick={() => console.log("Home clicked")}
/>`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Com Ícone Customizado</h3>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`import { Map } from "@/components/icons"

const tabs: ProjectTabItem[] = [
  {
    id: "tab-1",
    label: "Colaboratório",
    icon: <Map size={18} />,
    onClose: () => {},
  },
]`}</code>
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
                  <h3 className="text-sm font-semibold mb-2">activeTabId</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    <strong>Tipo:</strong> <code>string</code>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ID da tab atualmente ativa
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2">onTabChange</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    <strong>Tipo:</strong> <code>(tabId: string) =&gt; void</code>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Callback chamado quando uma tab é clicada
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2">onHomeClick</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    <strong>Tipo:</strong> <code>() =&gt; void</code>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Callback chamado quando o botão home é clicado
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2">tabs</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    <strong>Tipo:</strong> <code>ProjectTabItem[]</code>
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Padrão:</strong> <code>[]</code>
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    Array de tabs a serem exibidas. Cada item contém:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                    <li><code>id</code>: Identificador único da tab</li>
                    <li><code>label</code>: Texto exibido na tab</li>
                    <li><code>icon</code>: Ícone opcional (ReactNode)</li>
                    <li><code>onClose</code>: Callback opcional para fechar a tab</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Funcionalidades</CardTitle>
              <CardDescription>
                Recursos do componente ProjectTab
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Botão home no início da barra</li>
                <li>Múltiplas tabs de projetos</li>
                <li>Tab ativa com fundo branco e botão de fechar</li>
                <li>Tabs inativas com opacidade reduzida</li>
                <li>Ícones customizáveis por tab</li>
                <li>Callback para fechamento de tabs</li>
                <li>Navegação por teclado</li>
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
                <li>Navegação por teclado (Tab, Enter, Escape)</li>
                <li>ARIA labels apropriados</li>
                <li>Contraste adequado para leitura</li>
                <li>Foco visível em todos os elementos</li>
                <li>Suporte a leitores de tela</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
