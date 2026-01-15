"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SwitchShowcasePage() {
  const [isDark, setIsDark] = useState(false)
  const [checked1, setChecked1] = useState(false)
  const [checked2, setChecked2] = useState(true)
  const [checked3, setChecked3] = useState(false)

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
          <h1 className="text-4xl font-bold">Switch</h1>
          <p className="text-muted-foreground text-lg">
            Componente de switch para alternar entre estados ligado/desligado.
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

        {/* Sizes */}
        <Card>
          <CardHeader>
            <CardTitle>Tamanhos</CardTitle>
            <CardDescription>
              Diferentes tamanhos do componente Switch.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Small (sm)</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch size="sm" id="switch-sm-unchecked" />
                    <Label htmlFor="switch-sm-unchecked">Desligado</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch size="sm" id="switch-sm-checked" defaultChecked />
                    <Label htmlFor="switch-sm-checked">Ligado</Label>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Default</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch size="default" id="switch-default-unchecked" />
                    <Label htmlFor="switch-default-unchecked">Desligado</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch size="default" id="switch-default-checked" defaultChecked />
                    <Label htmlFor="switch-default-checked">Ligado</Label>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Large (lg)</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch size="lg" id="switch-lg-unchecked" />
                    <Label htmlFor="switch-lg-unchecked">Desligado</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch size="lg" id="switch-lg-checked" defaultChecked />
                    <Label htmlFor="switch-lg-checked">Ligado</Label>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* States */}
        <Card>
          <CardHeader>
            <CardTitle>Estados</CardTitle>
            <CardDescription>
              Diferentes estados do componente Switch.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Unchecked (Desligado)</h3>
                <div className="flex items-center space-x-2">
                  <Switch id="switch-state-unchecked" />
                  <Label htmlFor="switch-state-unchecked">Airplane Mode</Label>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Checked (Ligado)</h3>
                <div className="flex items-center space-x-2">
                  <Switch id="switch-state-checked" defaultChecked />
                  <Label htmlFor="switch-state-checked">Airplane Mode</Label>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Disabled (Unchecked)</h3>
                <div className="flex items-center space-x-2">
                  <Switch id="switch-state-disabled-unchecked" disabled />
                  <Label htmlFor="switch-state-disabled-unchecked" className="text-muted-foreground">
                    Airplane Mode
                  </Label>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Disabled (Checked)</h3>
                <div className="flex items-center space-x-2">
                  <Switch id="switch-state-disabled-checked" defaultChecked disabled />
                  <Label htmlFor="switch-state-disabled-checked" className="text-muted-foreground">
                    Airplane Mode
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Demo Interativo</CardTitle>
            <CardDescription>
              Teste o componente Switch interativamente.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="switch-demo-1"
                  checked={checked1}
                  onCheckedChange={setChecked1}
                />
                <Label htmlFor="switch-demo-1">
                  {checked1 ? "Ligado" : "Desligado"}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="switch-demo-2"
                  checked={checked2}
                  onCheckedChange={setChecked2}
                />
                <Label htmlFor="switch-demo-2">
                  {checked2 ? "Ligado" : "Desligado"}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="switch-demo-3"
                  checked={checked3}
                  onCheckedChange={setChecked3}
                />
                <Label htmlFor="switch-demo-3">
                  {checked3 ? "Ligado" : "Desligado"}
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Exemplos de Uso</CardTitle>
            <CardDescription>
              Código de exemplo para usar o componente Switch.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Básico</h3>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Com Estado Controlado</h3>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`const [checked, setChecked] = useState(false)

<Switch
  checked={checked}
  onCheckedChange={setChecked}
/>`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Com Estado Inicial</h3>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`<Switch defaultChecked />`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Com Diferentes Tamanhos</h3>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`<Switch size="sm" />
<Switch size="default" />
<Switch size="lg" />`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Desabilitado</h3>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`<Switch disabled />
<Switch defaultChecked disabled />`}</code>
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Props Documentation */}
        <Card>
          <CardHeader>
            <CardTitle>Documentação</CardTitle>
            <CardDescription>
              Todas as props disponíveis para o componente Switch.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Props</h3>
              <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                <div>
                  <code className="font-semibold">checked</code>:{" "}
                  <span className="text-muted-foreground">boolean (opcional)</span>
                  <p className="text-muted-foreground text-xs mt-1">
                    Estado controlado do switch. Quando fornecido, o componente se torna controlado.
                  </p>
                </div>
                <div>
                  <code className="font-semibold">defaultChecked</code>:{" "}
                  <span className="text-muted-foreground">boolean (opcional)</span>
                  <p className="text-muted-foreground text-xs mt-1">
                    Estado inicial do switch quando não controlado.
                  </p>
                </div>
                <div>
                  <code className="font-semibold">onCheckedChange</code>:{" "}
                  <span className="text-muted-foreground">
                    (checked: boolean) =&gt; void (opcional)
                  </span>
                  <p className="text-muted-foreground text-xs mt-1">
                    Callback chamado quando o estado do switch muda.
                  </p>
                </div>
                <div>
                  <code className="font-semibold">size</code>:{" "}
                  <span className="text-muted-foreground">
                    "default" | "sm" | "lg" (padrão: "default")
                  </span>
                  <p className="text-muted-foreground text-xs mt-1">
                    Tamanho do switch.
                  </p>
                </div>
                <div>
                  <code className="font-semibold">disabled</code>:{" "}
                  <span className="text-muted-foreground">boolean (opcional)</span>
                  <p className="text-muted-foreground text-xs mt-1">
                    Desabilita o switch.
                  </p>
                </div>
                <div>
                  <code className="font-semibold">className</code>:{" "}
                  <span className="text-muted-foreground">string (opcional)</span>
                  <p className="text-muted-foreground text-xs mt-1">
                    Classes CSS adicionais.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Acessibilidade</h3>
              <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                <p>
                  O componente Switch implementa <code>role="switch"</code> e{" "}
                  <code>aria-checked</code> para acessibilidade. Certifique-se de associar um{" "}
                  <code>Label</code> usando <code>htmlFor</code> e <code>id</code> para melhor
                  experiência de usuário.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
