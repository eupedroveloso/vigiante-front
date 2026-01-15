"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TooltipShowcasePage() {
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
          <h1 className="text-4xl font-bold">Tooltip</h1>
          <p className="text-muted-foreground text-lg">
            Componente de tooltip com posicionamento em todas as direções.
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

        {/* Positions */}
        <Card>
          <CardHeader>
            <CardTitle>Posicionamento</CardTitle>
            <CardDescription>
              Tooltips podem aparecer em diferentes posições.
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-visible">
            <div className="space-y-16 py-8">
              <div className="flex items-start justify-center gap-8 min-h-[80px]">
                <TooltipProvider>
                  <Tooltip open={true}>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Top</Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>This is a tooltip on top</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center justify-center gap-16 min-h-[80px]">
                <TooltipProvider>
                  <Tooltip open={true}>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Left</Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>This is a tooltip on left</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip open={true}>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Right</Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>This is a tooltip on right</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-end justify-center gap-8 min-h-[80px]">
                <TooltipProvider>
                  <Tooltip open={true}>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Bottom</Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>This is a tooltip on bottom</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Demo Interativo</CardTitle>
            <CardDescription>
              Passe o mouse sobre os botões para ver os tooltips.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to library</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="default">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is a tooltip</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>

        {/* Usage Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Exemplos de Uso</CardTitle>
            <CardDescription>
              Código de exemplo para usar o componente Tooltip.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Básico</h3>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Com Posicionamento</h3>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Top</Button>
    </TooltipTrigger>
    <TooltipContent side="top">
      <p>This is a tooltip on top</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`}</code>
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
              Todas as props disponíveis para os componentes Tooltip.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Tooltip Props</h3>
              <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                <div>
                  <code className="font-semibold">open</code>:{" "}
                  <span className="text-muted-foreground">boolean (opcional)</span>
                </div>
                <div>
                  <code className="font-semibold">onOpenChange</code>:{" "}
                  <span className="text-muted-foreground">
                    (open: boolean) =&gt; void (opcional)
                  </span>
                </div>
                <div>
                  <code className="font-semibold">delayDuration</code>:{" "}
                  <span className="text-muted-foreground">number (padrão: 300)</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">TooltipContent Props</h3>
              <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                <div>
                  <code className="font-semibold">side</code>:{" "}
                  <span className="text-muted-foreground">
                    "top" | "bottom" | "left" | "right" (padrão: "top")
                  </span>
                </div>
                <div>
                  <code className="font-semibold">sideOffset</code>:{" "}
                  <span className="text-muted-foreground">number (padrão: 4)</span>
                </div>
                <div>
                  <code className="font-semibold">className</code>:{" "}
                  <span className="text-muted-foreground">string (opcional)</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">TooltipTrigger Props</h3>
              <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                <div>
                  <code className="font-semibold">asChild</code>:{" "}
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
