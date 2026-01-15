"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TableCellContent } from "@/components/ui/table-cell-content"

const variants = [
  "default",
  "badge",
  "avatar",
  "switch",
  "button",
  "dropdown",
  "progress",
  "image",
  "input",
  "toggle-group",
] as const

const sizes = ["default", "md", "lg"] as const
const states = ["default", "hover"] as const

export default function TableCellShowcasePage() {
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
          <h1 className="text-4xl font-bold">Table Cell</h1>
          <p className="text-muted-foreground text-lg">
            Componente de célula de tabela com 144 variações de design do Figma.
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

        {/* All Variants Overview */}
        {variants.map((variant) => (
          <Card key={variant}>
            <CardHeader>
              <CardTitle className="capitalize">{variant.replace("-", " ")}</CardTitle>
              <CardDescription>
                Todas as variações de tamanho e estado para a variante {variant}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sizes.map((size) => (
                  <div key={size} className="space-y-4">
                    <h3 className="font-semibold text-lg capitalize">Size: {size}</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-32">State</TableHead>
                          <TableHead>Default</TableHead>
                          <TableHead>Bold Text</TableHead>
                          <TableHead>Right Align</TableHead>
                          <TableHead>Last Cell</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {states.map((state) => (
                          <TableRow key={state}>
                            <TableCell className="font-medium capitalize">{state}</TableCell>
                            <TableCell size={size}>
                              <TableCellContent
                                variant={variant}
                                size={size}
                                state={state}
                                tableCellText="Table Cell Text"
                              />
                            </TableCell>
                            <TableCell size={size}>
                              <TableCellContent
                                variant={variant}
                                size={size}
                                state={state}
                                boldText
                                tableCellText="Table Cell Text"
                              />
                            </TableCell>
                            <TableCell size={size}>
                              <TableCellContent
                                variant={variant}
                                size={size}
                                state={state}
                                rightTextAlign
                                tableCellText="Table Cell Text"
                              />
                            </TableCell>
                            <TableCell size={size}>
                              <TableCellContent
                                variant={variant}
                                size={size}
                                state={state}
                                lastCell
                                tableCellText="Table Cell Text"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Special Cases */}
        <Card>
          <CardHeader>
            <CardTitle>Casos Especiais</CardTitle>
            <CardDescription>
              Variações com descrição e avatar com descrição.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Variante</TableHead>
                    <TableHead>Com Descrição</TableHead>
                    <TableHead>Avatar com Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Default</TableCell>
                    <TableCell>
                      <TableCellContent
                        variant="default"
                        tableCellText="Table Cell Text"
                        descriptionText="Description Text"
                        showDescription
                      />
                    </TableCell>
                    <TableCell>
                      <TableCellContent
                        variant="avatar"
                        tableCellText="João Silva"
                        descriptionText="joao@example.com"
                        showDescription
                        showAvatarDescription
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Avatar (md)</TableCell>
                    <TableCell>
                      <TableCellContent
                        variant="avatar"
                        size="md"
                        tableCellText="Maria Santos"
                        descriptionText="maria@example.com"
                        showDescription
                        showAvatarDescription
                      />
                    </TableCell>
                    <TableCell>
                      <TableCellContent
                        variant="avatar"
                        size="md"
                        tableCellText="Pedro Oliveira"
                        descriptionText="pedro@example.com"
                        showDescription
                        showAvatarDescription
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Avatar (lg)</TableCell>
                    <TableCell>
                      <TableCellContent
                        variant="avatar"
                        size="lg"
                        tableCellText="Ana Costa"
                        descriptionText="ana@example.com"
                        showDescription
                        showAvatarDescription
                      />
                    </TableCell>
                    <TableCell>
                      <TableCellContent
                        variant="avatar"
                        size="lg"
                        tableCellText="Carlos Silva"
                        descriptionText="carlos@example.com"
                        showDescription
                        showAvatarDescription
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Usage Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Exemplos de Uso</CardTitle>
            <CardDescription>
              Código de exemplo para cada variante.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Default</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`<TableCell
  variant="default"
  size="default"
  state="default"
  tableCellText="Table Cell Text"
/>`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Badge</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`<TableCell
  variant="badge"
  size="md"
  tableCellText="Badge"
/>`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Avatar com Descrição</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`<TableCell
  variant="avatar"
  size="md"
  tableCellText="João Silva"
  descriptionText="joao@example.com"
  showDescription
  showAvatarDescription
/>`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Switch</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`<TableCell
  variant="switch"
  size="default"
  state="default"
/>`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Button</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`<TableCell
  variant="button"
  size="default"
  tableCellText="Button"
/>`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Progress</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`<TableCell
  variant="progress"
  size="default"
/>`}</code>
                  </pre>
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
              Todas as props disponíveis para o componente TableCell.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Props</h3>
                <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                  <div>
                    <code className="font-semibold">variant</code>:{" "}
                    <span className="text-muted-foreground">
                      "default" | "badge" | "avatar" | "switch" | "button" | "dropdown" | "progress" | "image" | "input" | "toggle-group"
                    </span>
                  </div>
                  <div>
                    <code className="font-semibold">size</code>:{" "}
                    <span className="text-muted-foreground">"default" | "md" | "lg"</span>
                  </div>
                  <div>
                    <code className="font-semibold">state</code>:{" "}
                    <span className="text-muted-foreground">"default" | "hover"</span>
                  </div>
                  <div>
                    <code className="font-semibold">boldText</code>:{" "}
                    <span className="text-muted-foreground">boolean</span>
                  </div>
                  <div>
                    <code className="font-semibold">rightTextAlign</code>:{" "}
                    <span className="text-muted-foreground">boolean</span>
                  </div>
                  <div>
                    <code className="font-semibold">lastCell</code>:{" "}
                    <span className="text-muted-foreground">boolean</span>
                  </div>
                  <div>
                    <code className="font-semibold">tableCellText</code>:{" "}
                    <span className="text-muted-foreground">string</span>
                  </div>
                  <div>
                    <code className="font-semibold">descriptionText</code>:{" "}
                    <span className="text-muted-foreground">string</span>
                  </div>
                  <div>
                    <code className="font-semibold">showDescription</code>:{" "}
                    <span className="text-muted-foreground">boolean</span>
                  </div>
                  <div>
                    <code className="font-semibold">showAvatarDescription</code>:{" "}
                    <span className="text-muted-foreground">boolean</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
