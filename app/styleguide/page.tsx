"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// Color scales for display
const primaryScale = [
  { name: "50", value: "oklch(0.98 0.05 35)" },
  { name: "100", value: "oklch(0.95 0.1 35)" },
  { name: "200", value: "oklch(0.9 0.15 35)" },
  { name: "300", value: "oklch(0.8 0.17 35)" },
  { name: "400", value: "oklch(0.7 0.18 35)" },
  { name: "500", value: "oklch(0.65 0.18 35)" }, // Base
  { name: "600", value: "oklch(0.55 0.18 35)" },
  { name: "700", value: "oklch(0.45 0.17 35)" },
  { name: "800", value: "oklch(0.35 0.15 35)" },
  { name: "900", value: "oklch(0.25 0.12 35)" },
]

const greyScale = [
  { name: "50", value: "oklch(0.98 0 0)" },
  { name: "100", value: "oklch(0.95 0 0)" },
  { name: "200", value: "oklch(0.9 0 0)" },
  { name: "300", value: "oklch(0.85 0 0)" },
  { name: "400", value: "oklch(0.7 0 0)" },
  { name: "500", value: "oklch(0.55 0 0)" },
  { name: "600", value: "oklch(0.4 0 0)" },
  { name: "700", value: "oklch(0.3 0 0)" },
  { name: "800", value: "oklch(0.2 0 0)" },
  { name: "900", value: "oklch(0.15 0 0)" },
]

export default function StyleguidePage() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  return (
    <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Design System</h1>
              <p className="text-muted-foreground">
                Tokens de design extraídos do Colaboratório
              </p>
            </div>
            <Button
              onClick={() => setIsDark(!isDark)}
              variant="outline"
            >
              {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </Button>
          </div>

          {/* Color Palette */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Paleta de Cores</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Cor Primária (Laranja)</CardTitle>
                  <CardDescription>Cor principal da marca - #FF6B35</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2">
                    {primaryScale.map((color) => (
                      <div key={color.name} className="space-y-2">
                        <div
                          className="w-full h-16 rounded-md border"
                          style={{ backgroundColor: color.value }}
                        />
                        <div className="text-xs text-center">
                          <div className="font-semibold">{color.name}</div>
                          <div className="text-muted-foreground text-[10px] truncate">
                            {color.value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Escala de Cinza</CardTitle>
                  <CardDescription>Neutros para backgrounds e textos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2">
                    {greyScale.map((color) => (
                      <div key={color.name} className="space-y-2">
                        <div
                          className="w-full h-16 rounded-md border"
                          style={{ backgroundColor: color.value }}
                        />
                        <div className="text-xs text-center">
                          <div className="font-semibold">{color.name}</div>
                          <div className="text-muted-foreground text-[10px] truncate">
                            {color.value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Semantic Colors */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Success</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="w-full h-24 rounded-md mb-2"
                    style={{ backgroundColor: "var(--success)" }}
                  />
                  <div className="text-xs text-muted-foreground">
                    var(--success)
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Warning</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="w-full h-24 rounded-md mb-2"
                    style={{ backgroundColor: "var(--warning)" }}
                  />
                  <div className="text-xs text-muted-foreground">
                    var(--warning)
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Error</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="w-full h-24 rounded-md mb-2"
                    style={{ backgroundColor: "var(--destructive)" }}
                  />
                  <div className="text-xs text-muted-foreground">
                    var(--destructive)
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="w-full h-24 rounded-md mb-2"
                    style={{ backgroundColor: "var(--info)" }}
                  />
                  <div className="text-xs text-muted-foreground">
                    var(--info)
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Typography */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Tipografia</h2>
            <Card>
              <CardHeader>
                <CardTitle>Fonte: Geist Sans</CardTitle>
                <CardDescription>Usada para headings e body text</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Heading 1</h1>
                  <p className="text-sm text-muted-foreground">text-4xl font-bold</p>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">Heading 2</h2>
                  <p className="text-sm text-muted-foreground">text-3xl font-bold</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Heading 3</h3>
                  <p className="text-sm text-muted-foreground">text-2xl font-semibold</p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Heading 4</h4>
                  <p className="text-sm text-muted-foreground">text-xl font-semibold</p>
                </div>
                <div>
                  <p className="text-base mb-2">
                    Body text - Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <p className="text-sm text-muted-foreground">text-base (padrão)</p>
                </div>
                <div>
                  <p className="text-sm mb-2">
                    Small text - Ut enim ad minim veniam, quis nostrud exercitation.
                  </p>
                  <p className="text-sm text-muted-foreground">text-sm</p>
                </div>
                <div>
                  <p className="text-xs mb-2">
                    Extra small text - Duis aute irure dolor in reprehenderit.
                  </p>
                  <p className="text-sm text-muted-foreground">text-xs</p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Border Radius */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Border Radius</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <div className="w-full h-20 bg-primary rounded-sm" />
                    <div className="text-xs text-center">
                      <div className="font-semibold">sm</div>
                      <div className="text-muted-foreground">calc(var(--radius) - 4px)</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-20 bg-primary rounded-md" />
                    <div className="text-xs text-center">
                      <div className="font-semibold">md</div>
                      <div className="text-muted-foreground">calc(var(--radius) - 2px))</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-20 bg-primary rounded-lg" />
                    <div className="text-xs text-center">
                      <div className="font-semibold">lg (base)</div>
                      <div className="text-muted-foreground">var(--radius) = 0.5rem</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-20 bg-primary rounded-full" />
                    <div className="text-xs text-center">
                      <div className="font-semibold">full</div>
                      <div className="text-muted-foreground">100% (pill)</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Spacing */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Espaçamentos</h2>
            <Card>
              <CardHeader>
                <CardTitle>Escala de Espaçamento</CardTitle>
                <CardDescription>Valores baseados na escala do Tailwind (múltiplos de 0.25rem = 4px)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Spacing Scale */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Escala Completa</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[
                      { name: "0", value: "0px", rem: "0rem" },
                      { name: "0.5", value: "2px", rem: "0.125rem" },
                      { name: "1", value: "4px", rem: "0.25rem" },
                      { name: "1.5", value: "6px", rem: "0.375rem" },
                      { name: "2", value: "8px", rem: "0.5rem" },
                      { name: "2.5", value: "10px", rem: "0.625rem" },
                      { name: "3", value: "12px", rem: "0.75rem" },
                      { name: "4", value: "16px", rem: "1rem" },
                      { name: "5", value: "20px", rem: "1.25rem" },
                      { name: "6", value: "24px", rem: "1.5rem" },
                      { name: "8", value: "32px", rem: "2rem" },
                      { name: "10", value: "40px", rem: "2.5rem" },
                      { name: "12", value: "48px", rem: "3rem" },
                      { name: "16", value: "64px", rem: "4rem" },
                      { name: "20", value: "80px", rem: "5rem" },
                      { name: "24", value: "96px", rem: "6rem" },
                    ].map((spacing) => (
                      <div key={spacing.name} className="space-y-2">
                        <div className="relative w-full h-16 bg-muted rounded border border-border flex items-center justify-center">
                          <div
                            className="bg-primary rounded"
                            style={{
                              width: spacing.value,
                              height: spacing.value,
                            }}
                          />
                        </div>
                        <div className="text-xs text-center">
                          <div className="font-semibold">{spacing.name}</div>
                          <div className="text-muted-foreground text-[10px]">
                            {spacing.value} / {spacing.rem}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spacing Examples */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Exemplos de Uso</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Padding Example */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold">Padding</h4>
                      <div className="space-y-2">
                        {[
                          { class: "p-1", value: "4px" },
                          { class: "p-2", value: "8px" },
                          { class: "p-3", value: "12px" },
                          { class: "p-4", value: "16px" },
                          { class: "p-6", value: "24px" },
                          { class: "p-8", value: "32px" },
                        ].map((item) => (
                          <div key={item.class} className="flex items-center gap-3">
                            <div
                              className={`bg-primary/20 border-2 border-primary border-dashed ${item.class}`}
                              style={{ minWidth: "60px" }}
                            >
                              <div className="bg-primary w-4 h-4 rounded" />
                            </div>
                            <div className="text-xs">
                              <code className="text-primary">{item.class}</code>
                              <span className="text-muted-foreground ml-2">{item.value}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Gap Example */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold">Gap</h4>
                      <div className="space-y-2">
                        {[
                          { class: "gap-1", value: "4px" },
                          { class: "gap-2", value: "8px" },
                          { class: "gap-3", value: "12px" },
                          { class: "gap-4", value: "16px" },
                          { class: "gap-6", value: "24px" },
                          { class: "gap-8", value: "32px" },
                        ].map((item) => (
                          <div key={item.class} className="flex items-center gap-3">
                            <div className={`flex ${item.class} bg-muted p-2 rounded border border-border`}>
                              <div className="bg-primary w-4 h-4 rounded" />
                              <div className="bg-primary w-4 h-4 rounded" />
                              <div className="bg-primary w-4 h-4 rounded" />
                            </div>
                            <div className="text-xs">
                              <code className="text-primary">{item.class}</code>
                              <span className="text-muted-foreground ml-2">{item.value}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Borders */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Borders</h2>
            <Card>
              <CardHeader>
                <CardTitle>Espessuras e Estilos de Borda</CardTitle>
                <CardDescription>Diferentes espessuras e estilos de borda disponíveis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Border Widths */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Espessuras</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { name: "0", class: "border-0", value: "0px" },
                      { name: "1", class: "border", value: "1px" },
                      { name: "2", class: "border-2", value: "2px" },
                      { name: "4", class: "border-4", value: "4px" },
                      { name: "8", class: "border-8", value: "8px" },
                    ].map((border) => (
                      <div key={border.name} className="space-y-2">
                        <div
                          className={`w-full h-20 bg-card rounded-lg ${border.class} border-border`}
                        />
                        <div className="text-xs text-center">
                          <div className="font-semibold">{border.name}</div>
                          <div className="text-muted-foreground text-[10px]">
                            <code>{border.class}</code>
                          </div>
                          <div className="text-muted-foreground text-[10px]">{border.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Border Styles */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Estilos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { name: "Solid", class: "border-solid", style: "solid" },
                      { name: "Dashed", class: "border-dashed", style: "dashed" },
                      { name: "Dotted", class: "border-dotted", style: "dotted" },
                      { name: "Double", class: "border-double border-4", style: "double" },
                    ].map((borderStyle) => (
                      <div key={borderStyle.name} className="space-y-2">
                        <div
                          className={`w-full h-20 bg-card rounded-lg border-2 border-border ${borderStyle.class}`}
                        />
                        <div className="text-xs text-center">
                          <div className="font-semibold">{borderStyle.name}</div>
                          <div className="text-muted-foreground text-[10px]">
                            <code>{borderStyle.class}</code>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Border Colors */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Cores</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: "Border", class: "border-border", var: "var(--border)" },
                      { name: "Input", class: "border-input", var: "var(--input)" },
                      { name: "Primary", class: "border-primary", var: "var(--primary)" },
                      { name: "Destructive", class: "border-destructive", var: "var(--destructive)" },
                    ].map((borderColor) => (
                      <div key={borderColor.name} className="space-y-2">
                        <div
                          className={`w-full h-20 bg-card rounded-lg border-2 ${borderColor.class}`}
                        />
                        <div className="text-xs text-center">
                          <div className="font-semibold">{borderColor.name}</div>
                          <div className="text-muted-foreground text-[10px]">
                            <code>{borderColor.class}</code>
                          </div>
                          <div className="text-muted-foreground text-[10px] truncate">
                            {borderColor.var}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Border Radius with Borders */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Bordas com Radius</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: "sm", class: "rounded-sm", radius: "calc(var(--radius) - 4px)" },
                      { name: "md", class: "rounded-md", radius: "calc(var(--radius) - 2px)" },
                      { name: "lg", class: "rounded-lg", radius: "var(--radius)" },
                      { name: "full", class: "rounded-full", radius: "100%" },
                    ].map((item) => (
                      <div key={item.name} className="space-y-2">
                        <div
                          className={`w-full h-20 bg-card border-2 border-primary ${item.class}`}
                        />
                        <div className="text-xs text-center">
                          <div className="font-semibold">{item.name}</div>
                          <div className="text-muted-foreground text-[10px]">
                            <code>{item.class}</code>
                          </div>
                          <div className="text-muted-foreground text-[10px]">{item.radius}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Shadows */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Sombras</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="w-full h-20 bg-card border rounded-lg shadow-sm" />
                    <div className="text-xs text-center">
                      <div className="font-semibold">shadow-sm</div>
                      <div className="text-muted-foreground">Sutil</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-20 bg-card border rounded-lg shadow-md" />
                    <div className="text-xs text-center">
                      <div className="font-semibold">shadow-md</div>
                      <div className="text-muted-foreground">Médio</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-20 bg-card border rounded-lg shadow-lg" />
                    <div className="text-xs text-center">
                      <div className="font-semibold">shadow-lg</div>
                      <div className="text-muted-foreground">Prominente</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Components */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Componentes</h2>
            
            {/* Buttons */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>Variações de botões</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Badges</CardTitle>
                <CardDescription>Indicadores de status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Alerts</CardTitle>
                <CardDescription>Mensagens de feedback</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertTitle>Informação</AlertTitle>
                  <AlertDescription>
                    Esta é uma mensagem de informação padrão.
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>
                    Esta é uma mensagem de erro.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Radio Group */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Radio Group</CardTitle>
                <CardDescription>Seleção única</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="option-one">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one">Opção 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="option-two">Opção 2</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-three" id="option-three" />
                    <Label htmlFor="option-three">Opção 3</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Card Example */}
            <Card>
              <CardHeader>
                <CardTitle>Card Component</CardTitle>
                <CardDescription>Container para conteúdo agrupado</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Este é um exemplo de card usando os tokens de design.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* System Colors */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Cores do Sistema</h2>
            <CardDescription className="mb-6">
              Todas as cores utilizadas em cada parte do sistema, organizadas por categoria
            </CardDescription>

            {/* Base Colors */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Base</CardTitle>
                <CardDescription>Cores fundamentais para backgrounds e textos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 border rounded-lg">
                      <div
                        className="w-16 h-16 rounded-md border-2 border-border"
                        style={{ backgroundColor: "var(--background)" }}
                      />
                      <div className="flex-1">
                        <div className="font-semibold">Background</div>
                        <div className="text-sm text-muted-foreground">var(--background)</div>
                        <div className="text-xs text-muted-foreground font-mono mt-1">
                          Cor de fundo principal da aplicação
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 border rounded-lg">
                      <div
                        className="w-16 h-16 rounded-md border-2 border-border flex items-center justify-center"
                        style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}
                      >
                        <span className="text-xs">Aa</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">Foreground</div>
                        <div className="text-sm text-muted-foreground">var(--foreground)</div>
                        <div className="text-xs text-muted-foreground font-mono mt-1">
                          Cor principal de texto
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card Colors */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Card</CardTitle>
                <CardDescription>Cores para componentes de card</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div
                      className="w-16 h-16 rounded-md border-2 border-border"
                      style={{ backgroundColor: "var(--card)" }}
                    />
                    <div className="flex-1">
                      <div className="font-semibold">Card</div>
                      <div className="text-sm text-muted-foreground">var(--card)</div>
                      <div className="text-xs text-muted-foreground font-mono mt-1">
                        Background de cards e containers
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div
                      className="w-16 h-16 rounded-md border-2 border-border flex items-center justify-center"
                      style={{ backgroundColor: "var(--card-foreground)", color: "var(--card)" }}
                    >
                      <span className="text-xs">Aa</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">Card Foreground</div>
                      <div className="text-sm text-muted-foreground">var(--card-foreground)</div>
                      <div className="text-xs text-muted-foreground font-mono mt-1">
                        Texto dentro de cards
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Primary Colors */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Primary</CardTitle>
                <CardDescription>Cor primária da marca (Laranja)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div
                      className="w-16 h-16 rounded-md border-2 border-border"
                      style={{ backgroundColor: "var(--primary)" }}
                    />
                    <div className="flex-1">
                      <div className="font-semibold">Primary</div>
                      <div className="text-sm text-muted-foreground">var(--primary)</div>
                      <div className="text-xs text-muted-foreground font-mono mt-1">
                        #FF5B04 - Cor principal da marca
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div
                      className="w-16 h-16 rounded-md border-2 border-border flex items-center justify-center"
                      style={{ backgroundColor: "var(--primary-foreground)", color: "var(--primary)" }}
                    >
                      <span className="text-xs">Aa</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">Primary Foreground</div>
                      <div className="text-sm text-muted-foreground">var(--primary-foreground)</div>
                      <div className="text-xs text-muted-foreground font-mono mt-1">
                        Texto sobre fundo primary
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Secondary Colors */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Secondary</CardTitle>
                <CardDescription>Cores secundárias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div
                      className="w-16 h-16 rounded-md border-2 border-border"
                      style={{ backgroundColor: "var(--secondary)" }}
                    />
                    <div className="flex-1">
                      <div className="font-semibold">Secondary</div>
                      <div className="text-sm text-muted-foreground">var(--secondary)</div>
                      <div className="text-xs text-muted-foreground font-mono mt-1">
                        Background secundário
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div
                      className="w-16 h-16 rounded-md border-2 border-border flex items-center justify-center"
                      style={{ backgroundColor: "var(--secondary-foreground)", color: "var(--secondary)" }}
                    >
                      <span className="text-xs">Aa</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">Secondary Foreground</div>
                      <div className="text-sm text-muted-foreground">var(--secondary-foreground)</div>
                      <div className="text-xs text-muted-foreground font-mono mt-1">
                        Texto sobre fundo secondary
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Muted Colors */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Muted</CardTitle>
                <CardDescription>Cores suaves para backgrounds e textos secundários</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div
                      className="w-16 h-16 rounded-md border-2 border-border"
                      style={{ backgroundColor: "var(--muted)" }}
                    />
                    <div className="flex-1">
                      <div className="font-semibold">Muted</div>
                      <div className="text-sm text-muted-foreground">var(--muted)</div>
                      <div className="text-xs text-muted-foreground font-mono mt-1">
                        Background suave para elementos secundários
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div
                      className="w-16 h-16 rounded-md border-2 border-border flex items-center justify-center"
                      style={{ backgroundColor: "var(--muted-foreground)", color: "var(--muted)" }}
                    >
                      <span className="text-xs">Aa</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">Muted Foreground</div>
                      <div className="text-sm text-muted-foreground">var(--muted-foreground)</div>
                      <div className="text-xs text-muted-foreground font-mono mt-1">
                        Texto secundário/desabilitado
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Accent Colors */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Accent</CardTitle>
                <CardDescription>Cores de destaque</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div
                      className="w-16 h-16 rounded-md border-2 border-border"
                      style={{ backgroundColor: "var(--accent)" }}
                    />
                    <div className="flex-1">
                      <div className="font-semibold">Accent</div>
                      <div className="text-sm text-muted-foreground">var(--accent)</div>
                      <div className="text-xs text-muted-foreground font-mono mt-1">
                        Background de destaque (hover states)
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div
                      className="w-16 h-16 rounded-md border-2 border-border flex items-center justify-center"
                      style={{ backgroundColor: "var(--accent-foreground)", color: "var(--accent)" }}
                    >
                      <span className="text-xs">Aa</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">Accent Foreground</div>
                      <div className="text-sm text-muted-foreground">var(--accent-foreground)</div>
                      <div className="text-xs text-muted-foreground font-mono mt-1">
                        Texto sobre fundo accent
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Destructive Colors */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Destructive</CardTitle>
                <CardDescription>Cores para ações destrutivas e erros</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div
                      className="w-16 h-16 rounded-md border-2 border-border"
                      style={{ backgroundColor: "var(--destructive)" }}
                    />
                    <div className="flex-1">
                      <div className="font-semibold">Destructive</div>
                      <div className="text-sm text-muted-foreground">var(--destructive)</div>
                      <div className="text-xs text-muted-foreground font-mono mt-1">
                        Vermelho para erros e ações destrutivas
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div
                      className="w-16 h-16 rounded-md border-2 border-border flex items-center justify-center"
                      style={{ backgroundColor: "var(--destructive-foreground)", color: "var(--destructive)" }}
                    >
                      <span className="text-xs">Aa</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">Destructive Foreground</div>
                      <div className="text-sm text-muted-foreground">var(--destructive-foreground)</div>
                      <div className="text-xs text-muted-foreground font-mono mt-1">
                        Texto sobre fundo destructive
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Borders & Inputs */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Borders & Inputs</CardTitle>
                <CardDescription>Cores para bordas e campos de entrada</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div
                      className="w-16 h-16 rounded-md border-2"
                      style={{ borderColor: "var(--border)", backgroundColor: "transparent" }}
                    />
                    <div className="flex-1">
                      <div className="font-semibold">Border</div>
                      <div className="text-sm text-muted-foreground">var(--border)</div>
                      <div className="text-xs text-muted-foreground font-mono mt-1">
                        Cor padrão de bordas
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div
                      className="w-16 h-16 rounded-md border-2"
                      style={{ borderColor: "var(--input)", backgroundColor: "var(--input)" }}
                    />
                    <div className="flex-1">
                      <div className="font-semibold">Input</div>
                      <div className="text-sm text-muted-foreground">var(--input)</div>
                      <div className="text-xs text-muted-foreground font-mono mt-1">
                        Background e borda de inputs
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div
                      className="w-16 h-16 rounded-md border-2 ring-2"
                      style={{ borderColor: "var(--ring)", ringColor: "var(--ring)" }}
                    />
                    <div className="flex-1">
                      <div className="font-semibold">Ring</div>
                      <div className="text-sm text-muted-foreground">var(--ring)</div>
                      <div className="text-xs text-muted-foreground font-mono mt-1">
                        Cor do anel de foco (focus ring)
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Popover Colors */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Popover / Dropdown / Tooltip</CardTitle>
                <CardDescription>Cores para elementos flutuantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div
                      className="w-16 h-16 rounded-md border-2 border-border"
                      style={{ backgroundColor: "var(--popover)" }}
                    />
                    <div className="flex-1">
                      <div className="font-semibold">Popover</div>
                      <div className="text-sm text-muted-foreground">var(--popover)</div>
                      <div className="text-xs text-muted-foreground font-mono mt-1">
                        Background de popovers, dropdowns e tooltips
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div
                      className="w-16 h-16 rounded-md border-2 border-border flex items-center justify-center"
                      style={{ backgroundColor: "var(--popover-foreground)", color: "var(--popover)" }}
                    >
                      <span className="text-xs">Aa</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">Popover Foreground</div>
                      <div className="text-sm text-muted-foreground">var(--popover-foreground)</div>
                      <div className="text-xs text-muted-foreground font-mono mt-1">
                        Texto dentro de popovers
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chart Colors */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Chart Colors</CardTitle>
                <CardDescription>Cores para gráficos e visualizações</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {[
                    { name: "Chart 1", var: "var(--chart-1)", desc: "Laranja primário" },
                    { name: "Chart 2", var: "var(--chart-2)", desc: "Azul complementar" },
                    { name: "Chart 3", var: "var(--chart-3)", desc: "Verde" },
                    { name: "Chart 4", var: "var(--chart-4)", desc: "Roxo" },
                    { name: "Chart 5", var: "var(--chart-5)", desc: "Amarelo/laranja" },
                  ].map((chart) => (
                    <div key={chart.name} className="flex flex-col items-center gap-3 p-4 border rounded-lg">
                      <div
                        className="w-full h-20 rounded-md border-2 border-border"
                        style={{ backgroundColor: chart.var }}
                      />
                      <div className="text-center">
                        <div className="font-semibold text-sm">{chart.name}</div>
                        <div className="text-xs text-muted-foreground font-mono mt-1">
                          {chart.var}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {chart.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sidebar Colors */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Sidebar</CardTitle>
                <CardDescription>Cores específicas para a barra lateral</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "Sidebar", var: "var(--sidebar)", desc: "Background da sidebar" },
                    { name: "Sidebar Foreground", var: "var(--sidebar-foreground)", desc: "Texto da sidebar" },
                    { name: "Sidebar Primary", var: "var(--sidebar-primary)", desc: "Cor primária na sidebar" },
                    { name: "Sidebar Primary Foreground", var: "var(--sidebar-primary-foreground)", desc: "Texto sobre primary na sidebar" },
                    { name: "Sidebar Accent", var: "var(--sidebar-accent)", desc: "Destaque na sidebar" },
                    { name: "Sidebar Accent Foreground", var: "var(--sidebar-accent-foreground)", desc: "Texto sobre accent na sidebar" },
                    { name: "Sidebar Border", var: "var(--sidebar-border)", desc: "Borda da sidebar" },
                    { name: "Sidebar Ring", var: "var(--sidebar-ring)", desc: "Ring de foco na sidebar" },
                  ].map((sidebar) => (
                    <div key={sidebar.name} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div
                        className="w-12 h-12 rounded-md border-2 border-border shrink-0"
                        style={{ backgroundColor: sidebar.var }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm">{sidebar.name}</div>
                        <div className="text-xs text-muted-foreground font-mono truncate">
                          {sidebar.var}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {sidebar.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Semantic Colors */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Cores Semânticas</CardTitle>
                <CardDescription>Cores para feedback e estados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: "Success", var: "var(--success)", foreground: "var(--success-foreground)", desc: "Verde para sucesso" },
                    { name: "Warning", var: "var(--warning)", foreground: "var(--warning-foreground)", desc: "Amarelo/laranja para avisos" },
                    { name: "Info", var: "var(--info)", foreground: "var(--info-foreground)", desc: "Azul para informações" },
                    { name: "Destructive", var: "var(--destructive)", foreground: "var(--destructive-foreground)", desc: "Vermelho para erros" },
                  ].map((semantic) => (
                    <div key={semantic.name} className="space-y-3 p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-16 h-16 rounded-md border-2 border-border"
                          style={{ backgroundColor: semantic.var }}
                        />
                        <div className="flex-1">
                          <div className="font-semibold">{semantic.name}</div>
                          <div className="text-xs text-muted-foreground font-mono">
                            {semantic.var}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-16 h-16 rounded-md border-2 border-border flex items-center justify-center"
                          style={{ backgroundColor: semantic.foreground, color: semantic.var }}
                        >
                          <span className="text-xs">Aa</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{semantic.name} Foreground</div>
                          <div className="text-xs text-muted-foreground font-mono">
                            {semantic.foreground}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {semantic.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CSS Variables Reference */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Variáveis CSS</h2>
            <Card>
              <CardHeader>
                <CardTitle>Referência de Tokens</CardTitle>
                <CardDescription>Todas as variáveis CSS disponíveis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
                  <div className="space-y-2">
                    <div><code className="text-primary">--background</code></div>
                    <div><code className="text-primary">--foreground</code></div>
                    <div><code className="text-primary">--primary</code></div>
                    <div><code className="text-primary">--primary-foreground</code></div>
                    <div><code className="text-primary">--secondary</code></div>
                    <div><code className="text-primary">--secondary-foreground</code></div>
                    <div><code className="text-primary">--muted</code></div>
                    <div><code className="text-primary">--muted-foreground</code></div>
                    <div><code className="text-primary">--accent</code></div>
                    <div><code className="text-primary">--accent-foreground</code></div>
                  </div>
                  <div className="space-y-2">
                    <div><code className="text-primary">--destructive</code></div>
                    <div><code className="text-primary">--destructive-foreground</code></div>
                    <div><code className="text-primary">--border</code></div>
                    <div><code className="text-primary">--input</code></div>
                    <div><code className="text-primary">--ring</code></div>
                    <div><code className="text-primary">--radius</code></div>
                    <div><code className="text-primary">--success</code></div>
                    <div><code className="text-primary">--warning</code></div>
                    <div><code className="text-primary">--info</code></div>
                    <div><code className="text-primary">--card</code></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
  )
}
