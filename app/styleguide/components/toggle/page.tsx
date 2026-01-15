"use client"

import { useState } from "react"
import { Toggle } from "@/components/ui/toggle"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bold } from "lucide-react"

export default function ToggleShowcasePage() {
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
          <h1 className="text-4xl font-bold">Toggle</h1>
          <p className="text-muted-foreground text-lg">
            Componente de toggle com variações de tamanho, variante e estado.
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

        {/* Variants */}
        <Card>
          <CardHeader>
            <CardTitle>Variantes</CardTitle>
            <CardDescription>
              Variações de estilo do componente Toggle.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Default</h3>
                <div className="flex items-center gap-4">
                  <Toggle variant="default" size="default">
                    <Bold className="h-4 w-4" />
                    Text
                  </Toggle>
                  <Toggle variant="default" size="sm">
                    <Bold className="h-3.5 w-3.5" />
                    Text
                  </Toggle>
                  <Toggle variant="default" size="lg">
                    <Bold className="h-4 w-4" />
                    Text
                  </Toggle>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Outline</h3>
                <div className="flex items-center gap-4">
                  <Toggle variant="outline" size="default">
                    <Bold className="h-4 w-4" />
                    Text
                  </Toggle>
                  <Toggle variant="outline" size="sm">
                    <Bold className="h-3.5 w-3.5" />
                    Text
                  </Toggle>
                  <Toggle variant="outline" size="lg">
                    <Bold className="h-4 w-4" />
                    Text
                  </Toggle>
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
              Diferentes estados do componente Toggle.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Default (Off)</h3>
                <div className="flex items-center gap-4">
                  <Toggle variant="default" size="default">
                    <Bold className="h-4 w-4" />
                    Text
                  </Toggle>
                  <Toggle variant="outline" size="default">
                    <Bold className="h-4 w-4" />
                    Text
                  </Toggle>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Pressed (On)</h3>
                <div className="flex items-center gap-4">
                  <Toggle variant="default" size="default" pressed>
                    <Bold className="h-4 w-4" />
                    Text
                  </Toggle>
                  <Toggle variant="outline" size="default" pressed>
                    <Bold className="h-4 w-4" />
                    Text
                  </Toggle>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Disabled</h3>
                <div className="flex items-center gap-4">
                  <Toggle variant="default" size="default" disabled>
                    <Bold className="h-4 w-4" />
                    Text
                  </Toggle>
                  <Toggle variant="outline" size="default" disabled>
                    <Bold className="h-4 w-4" />
                    Text
                  </Toggle>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sizes */}
        <Card>
          <CardHeader>
            <CardTitle>Tamanhos</CardTitle>
            <CardDescription>
              Diferentes tamanhos do componente Toggle.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Small (sm)</h3>
                <div className="flex items-center gap-4">
                  <Toggle variant="default" size="sm">
                    <Bold className="h-3.5 w-3.5" />
                    Text
                  </Toggle>
                  <Toggle variant="outline" size="sm">
                    <Bold className="h-3.5 w-3.5" />
                    Text
                  </Toggle>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Default</h3>
                <div className="flex items-center gap-4">
                  <Toggle variant="default" size="default">
                    <Bold className="h-4 w-4" />
                    Text
                  </Toggle>
                  <Toggle variant="outline" size="default">
                    <Bold className="h-4 w-4" />
                    Text
                  </Toggle>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Large (lg)</h3>
                <div className="flex items-center gap-4">
                  <Toggle variant="default" size="lg">
                    <Bold className="h-4 w-4" />
                    Text
                  </Toggle>
                  <Toggle variant="outline" size="lg">
                    <Bold className="h-4 w-4" />
                    Text
                  </Toggle>
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
              Teste o componente Toggle interativamente.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Toggle variant="default" size="default">
                  <Bold className="h-4 w-4" />
                  Clique para alternar
                </Toggle>
                <Toggle variant="outline" size="default">
                  <Bold className="h-4 w-4" />
                  Clique para alternar
                </Toggle>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Exemplos de Uso</CardTitle>
            <CardDescription>
              Código de exemplo para usar o componente Toggle.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Básico</h3>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`import { Toggle } from "@/components/ui/toggle"
import { Bold } from "lucide-react"

<Toggle>
  <Bold className="h-4 w-4" />
  Text
</Toggle>`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Com Variante Outline</h3>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`<Toggle variant="outline" size="default">
  <Bold className="h-4 w-4" />
  Text
</Toggle>`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Com Estado Controlado</h3>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`const [pressed, setPressed] = useState(false)

<Toggle
  pressed={pressed}
  onPressedChange={setPressed}
>
  <Bold className="h-4 w-4" />
  Text
</Toggle>`}</code>
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
              Todas as props disponíveis para o componente Toggle.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Props</h3>
              <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                <div>
                  <code className="font-semibold">variant</code>:{" "}
                  <span className="text-muted-foreground">
                    "default" | "outline" (padrão: "default")
                  </span>
                </div>
                <div>
                  <code className="font-semibold">size</code>:{" "}
                  <span className="text-muted-foreground">
                    "default" | "sm" | "lg" (padrão: "default")
                  </span>
                </div>
                <div>
                  <code className="font-semibold">pressed</code>:{" "}
                  <span className="text-muted-foreground">boolean (opcional)</span>
                </div>
                <div>
                  <code className="font-semibold">onPressedChange</code>:{" "}
                  <span className="text-muted-foreground">
                    (pressed: boolean) =&gt; void (opcional)
                  </span>
                </div>
                <div>
                  <code className="font-semibold">disabled</code>:{" "}
                  <span className="text-muted-foreground">boolean (opcional)</span>
                </div>
                <div>
                  <code className="font-semibold">className</code>:{" "}
                  <span className="text-muted-foreground">string (opcional)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
