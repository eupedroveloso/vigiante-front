"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
]

const users = [
  {
    name: "João Silva",
    email: "joao@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    name: "Maria Santos",
    email: "maria@example.com",
    role: "User",
    status: "Active",
  },
  {
    name: "Pedro Oliveira",
    email: "pedro@example.com",
    role: "User",
    status: "Inactive",
  },
  {
    name: "Ana Costa",
    email: "ana@example.com",
    role: "Moderator",
    status: "Active",
  },
]

export default function TableShowcasePage() {
  const [isDark, setIsDark] = useState(false)
  const [selectedRow, setSelectedRow] = useState<string | null>(null)

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      Paid: "default",
      Pending: "secondary",
      Unpaid: "destructive",
      Active: "default",
      Inactive: "outline",
    }
    return (
      <Badge variant={variants[status] || "default"}>
        {status}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Table</h1>
          <p className="text-muted-foreground text-lg">
            Componente de tabela para exibir dados estruturados em linhas e colunas.
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
              Exemplo simples de tabela com cabeçalho e corpo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.email}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                <code>{`import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Nome</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Função</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {users.map((user) => (
      <TableRow key={user.email}>
        <TableCell className="font-medium">{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell>{user.status}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Variants */}
        <Card>
          <CardHeader>
            <CardTitle>Variações (Variants)</CardTitle>
            <CardDescription>
              O componente Table suporta diferentes variações visuais através da prop variant.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Default */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Default</h3>
              <p className="text-sm text-muted-foreground">
                Estilo padrão da tabela sem bordas externas.
              </p>
              <div className="p-4 border rounded-lg bg-card">
                <Table variant="default">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.slice(0, 3).map((user) => (
                      <TableRow key={user.email}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`<Table variant="default">
  {/* conteúdo */}
</Table>`}</code>
                </pre>
              </div>
            </div>

            {/* Bordered */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Bordered</h3>
              <p className="text-sm text-muted-foreground">
                Tabela com bordas visíveis em todas as células.
              </p>
              <div className="p-4 border rounded-lg bg-card">
                <Table variant="bordered">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.slice(0, 3).map((user) => (
                      <TableRow key={user.email}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`<Table variant="bordered">
  {/* conteúdo */}
</Table>`}</code>
                </pre>
              </div>
            </div>

            {/* Striped */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Striped</h3>
              <p className="text-sm text-muted-foreground">
                Tabela com linhas alternadas (zebrado) para melhor legibilidade.
              </p>
              <div className="p-4 border rounded-lg bg-card">
                <Table variant="striped">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.email}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`<Table variant="striped">
  {/* conteúdo */}
</Table>`}</code>
                </pre>
              </div>
            </div>

            {/* Compact */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Compact</h3>
              <p className="text-sm text-muted-foreground">
                Tabela com padding reduzido para exibir mais informações em menos espaço.
              </p>
              <div className="p-4 border rounded-lg bg-card">
                <Table variant="compact">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fatura</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Método</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium">{invoice.invoice}</TableCell>
                        <TableCell>{getStatusBadge(invoice.paymentStatus)}</TableCell>
                        <TableCell>{invoice.paymentMethod}</TableCell>
                        <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`<Table variant="compact">
  {/* conteúdo */}
</Table>`}</code>
                </pre>
              </div>
            </div>

            {/* Hover */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Hover</h3>
              <p className="text-sm text-muted-foreground">
                Tabela com efeito hover destacado nas linhas.
              </p>
              <div className="p-4 border rounded-lg bg-card">
                <Table variant="hover">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.email} variant="hover">
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`<Table variant="hover">
  <TableBody>
    {users.map((user) => (
      <TableRow key={user.email} variant="hover">
        {/* células */}
      </TableRow>
    ))}
  </TableBody>
</Table>`}</code>
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* With Caption */}
        <Card>
          <CardHeader>
            <CardTitle>Com Caption</CardTitle>
            <CardDescription>
              Use TableCaption para adicionar uma descrição ou título à tabela.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg bg-card">
              <Table>
                <TableCaption>Lista de faturas recentes</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Fatura</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.slice(0, 3).map((invoice) => (
                    <TableRow key={invoice.invoice}>
                      <TableCell className="font-medium">{invoice.invoice}</TableCell>
                      <TableCell>{getStatusBadge(invoice.paymentStatus)}</TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                      <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                <code>{`<Table>
  <TableCaption>Lista de faturas recentes</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Fatura</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Método</TableHead>
      <TableHead className="text-right">Valor</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {invoices.map((invoice) => (
      <TableRow key={invoice.invoice}>
        <TableCell className="font-medium">{invoice.invoice}</TableCell>
        <TableCell>{invoice.paymentStatus}</TableCell>
        <TableCell>{invoice.paymentMethod}</TableCell>
        <TableCell className="text-right">{invoice.totalAmount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* With Footer */}
        <Card>
          <CardHeader>
            <CardTitle>Com Footer</CardTitle>
            <CardDescription>
              Use TableFooter para exibir totais ou resumos na parte inferior da tabela.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Fatura</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                      <TableCell className="font-medium">{invoice.invoice}</TableCell>
                      <TableCell>{getStatusBadge(invoice.paymentStatus)}</TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                      <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$1,750.00</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                <code>{`<Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Fatura</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Método</TableHead>
      <TableHead className="text-right">Valor</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {invoices.map((invoice) => (
      <TableRow key={invoice.invoice}>
        <TableCell className="font-medium">{invoice.invoice}</TableCell>
        <TableCell>{invoice.paymentStatus}</TableCell>
        <TableCell>{invoice.paymentMethod}</TableCell>
        <TableCell className="text-right">{invoice.totalAmount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3}>Total</TableCell>
      <TableCell className="text-right">$1,750.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* With Alignment */}
        <Card>
          <CardHeader>
            <CardTitle>Alinhamento de Texto</CardTitle>
            <CardDescription>
              Use classes de alinhamento do Tailwind para controlar o alinhamento do texto nas células.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">Esquerda</TableHead>
                    <TableHead className="text-center">Centro</TableHead>
                    <TableHead className="text-right">Direita</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-left">Alinhado à esquerda</TableCell>
                    <TableCell className="text-center">Centralizado</TableCell>
                    <TableCell className="text-right">Alinhado à direita</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-left">Texto longo alinhado à esquerda para melhor legibilidade</TableCell>
                    <TableCell className="text-center">Centro</TableCell>
                    <TableCell className="text-right">R$ 1.234,56</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                <code>{`<TableHead className="text-left">Esquerda</TableHead>
<TableHead className="text-center">Centro</TableHead>
<TableHead className="text-right">Direita</TableHead>

<TableCell className="text-left">Alinhado à esquerda</TableCell>
<TableCell className="text-center">Centralizado</TableCell>
<TableCell className="text-right">Alinhado à direita</TableCell>`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* With Row Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Seleção de Linhas</CardTitle>
            <CardDescription>
              Use data-state="selected" para destacar linhas selecionadas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow
                      key={user.email}
                      data-state={selectedRow === user.email ? "selected" : undefined}
                      onClick={() => setSelectedRow(selectedRow === user.email ? null : user.email)}
                      className="cursor-pointer"
                    >
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Editar</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                <code>{`<TableRow
  data-state={selectedRow === user.email ? "selected" : undefined}
  onClick={() => setSelectedRow(user.email)}
  className="cursor-pointer"
>
  <TableCell className="font-medium">{user.name}</TableCell>
  <TableCell>{user.email}</TableCell>
</TableRow>`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Compact Table */}
        <Card>
          <CardHeader>
            <CardTitle>Tabela Compacta</CardTitle>
            <CardDescription>
              Use padding reduzido para criar uma tabela mais compacta.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="h-10 px-2">Fatura</TableHead>
                    <TableHead className="h-10 px-2">Status</TableHead>
                    <TableHead className="h-10 px-2">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.slice(0, 3).map((invoice) => (
                    <TableRow key={invoice.invoice}>
                      <TableCell className="px-2 py-1">{invoice.invoice}</TableCell>
                      <TableCell className="px-2 py-1">{getStatusBadge(invoice.paymentStatus)}</TableCell>
                      <TableCell className="px-2 py-1">{invoice.totalAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                <code>{`<TableHead className="h-10 px-2">Fatura</TableHead>
<TableCell className="px-2 py-1">{invoice.invoice}</TableCell>`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Responsive Table */}
        <Card>
          <CardHeader>
            <CardTitle>Tabela Responsiva</CardTitle>
            <CardDescription>
              A tabela é automaticamente responsiva com scroll horizontal em telas pequenas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg bg-card">
              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fatura</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Método de Pagamento</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium">{invoice.invoice}</TableCell>
                        <TableCell>{getStatusBadge(invoice.paymentStatus)}</TableCell>
                        <TableCell>{invoice.paymentMethod}</TableCell>
                        <TableCell>01/01/2024</TableCell>
                        <TableCell>Cliente {invoice.invoice.slice(-1)}</TableCell>
                        <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                <code>{`<div className="w-full overflow-x-auto">
  <Table>
    {/* Conteúdo da tabela */}
  </Table>
</div>`}</code>
              </pre>
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
                <h3 className="font-semibold mb-2">Table</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Componente raiz que envolve toda a tabela. Adiciona scroll automático quando necessário.
                </p>
                <div className="bg-muted p-3 rounded text-sm mb-2">
                  <code>{`React.HTMLAttributes<HTMLTableElement> & { variant?: "default" | "bordered" | "striped" | "compact" | "hover" }`}</code>
                </div>
                <div className="text-sm space-y-1">
                  <p className="font-medium">Variantes disponíveis:</p>
                  <ul className="list-disc list-inside ml-2 space-y-1 text-muted-foreground">
                    <li><code>default</code> - Estilo padrão sem bordas externas</li>
                    <li><code>bordered</code> - Tabela com bordas visíveis em todas as células</li>
                    <li><code>striped</code> - Linhas alternadas (zebrado) para melhor legibilidade</li>
                    <li><code>compact</code> - Padding reduzido para exibir mais informações</li>
                    <li><code>hover</code> - Efeito hover destacado nas linhas</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">TableHeader</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Container para o cabeçalho da tabela (thead).
                </p>
                <div className="bg-muted p-3 rounded text-sm">
                  <code>{`React.HTMLAttributes<HTMLTableSectionElement>`}</code>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">TableBody</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Container para o corpo da tabela (tbody).
                </p>
                <div className="bg-muted p-3 rounded text-sm">
                  <code>{`React.HTMLAttributes<HTMLTableSectionElement>`}</code>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">TableFooter</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Container para o rodapé da tabela (tfoot). Usado para totais e resumos.
                </p>
                <div className="bg-muted p-3 rounded text-sm">
                  <code>{`React.HTMLAttributes<HTMLTableSectionElement>`}</code>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">TableRow</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Linha da tabela (tr). Suporta data-state="selected" para destacar linhas selecionadas.
                </p>
                <div className="bg-muted p-3 rounded text-sm mb-2">
                  <code>{`React.HTMLAttributes<HTMLTableRowElement> & { variant?: "default" | "hover" | "none" }`}</code>
                </div>
                <div className="text-sm space-y-1">
                  <p className="font-medium">Variantes disponíveis:</p>
                  <ul className="list-disc list-inside ml-2 space-y-1 text-muted-foreground">
                    <li><code>default</code> - Efeito hover suave (bg-muted/50)</li>
                    <li><code>hover</code> - Efeito hover destacado (bg-muted)</li>
                    <li><code>none</code> - Sem efeito hover</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">TableHead</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Célula de cabeçalho (th). Use para títulos de colunas.
                </p>
                <div className="bg-muted p-3 rounded text-sm">
                  <code>{`React.ThHTMLAttributes<HTMLTableCellElement>`}</code>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">TableCell</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Célula de dados (td). Use para conteúdo das linhas.
                </p>
                <div className="bg-muted p-3 rounded text-sm">
                  <code>{`React.TdHTMLAttributes<HTMLTableCellElement>`}</code>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">TableCaption</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Legenda da tabela (caption). Use para descrições ou títulos.
                </p>
                <div className="bg-muted p-3 rounded text-sm">
                  <code>{`React.HTMLAttributes<HTMLTableCaptionElement>`}</code>
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
              <li>Usa elementos semânticos HTML5 (<code>table</code>, <code>thead</code>, <code>tbody</code>, <code>th</code>, <code>td</code>)</li>
              <li>Suporta navegação por teclado (Tab, Shift+Tab, setas)</li>
              <li>Linhas selecionadas usam <code>data-state="selected"</code> para leitores de tela</li>
              <li>Caption fornece contexto adicional para leitores de tela</li>
              <li>Scroll horizontal automático em telas pequenas mantém acessibilidade</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
