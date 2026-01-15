"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { PrincipalBar } from "@/components/PrincipalBar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Ellipsis, RotateRight, Plus, List, Grid } from "@/components/icons"

interface FormData {
  id: string
  name: string
  responses: number
  responsible: {
    name: string
    email: string
    avatar?: string
    fallback?: string
  }
  mappings: string
  status: "published" | "draft"
}

const formsData: FormData[] = [
  {
    id: "1",
    name: "Focos de Dengue - Brasília",
    responses: 84,
    responsible: {
      name: "Thiago Brito",
      email: "thiagobrito@fiocruz.br",
      avatar: undefined,
    },
    mappings: "24/02/2025 às 13h31",
    status: "published",
  },
  {
    id: "2",
    name: "Regiões de Vulnerabilidade - Brasília",
    responses: 31,
    responsible: {
      name: "Matheus Sales Gomes",
      email: "matheusgomes@fiocruz.br",
      fallback: "MG",
    },
    mappings: "08/11/2023 às 18:15",
    status: "draft",
  },
  {
    id: "3",
    name: "Apoiadores - Pesquisadores Sociais",
    responses: 2,
    responsible: {
      name: "Marcia Silva",
      email: "marciasilva@fiocruz.br",
      avatar: undefined,
    },
    mappings: "30/01/26 às 22h03",
    status: "draft",
  },
  {
    id: "4",
    name: "Equipamentos públicos",
    responses: 99,
    responsible: {
      name: "Marcos Ramos",
      email: "marcos@fiocruz.br",
      avatar: undefined,
    },
    mappings: "08/11/2023 às 18:15",
    status: "published",
  },
  {
    id: "5",
    name: "Mapeamento de Focos em expansão",
    responses: 0,
    responsible: {
      name: "Gabriela Souza",
      email: "gabrielasouza@fiocruz.br",
      avatar: undefined,
    },
    mappings: "08/11/2023 às 18:15",
    status: "draft",
  },
  {
    id: "6",
    name: "Mapeamento de Acesso a UBS - Brasília",
    responses: 0,
    responsible: {
      name: "Mariana Lemos Silva",
      email: "lemossilva@fiocruz.br",
      avatar: undefined,
    },
    mappings: "08/11/2023 às 18:15",
    status: "draft",
  },
  {
    id: "7",
    name: "ONGS de acesso a comunidades carentes - Centro",
    responses: 12,
    responsible: {
      name: "Lucas Martinez",
      email: "lucas.martinez@example.com",
      avatar: undefined,
    },
    mappings: "08/11/2023 às 18:15",
    status: "draft",
  },
  {
    id: "8",
    name: "Unidades Fiocruz Brasil",
    responses: 9,
    responsible: {
      name: "Henrique Chaves",
      email: "Chaves@fiocruz.br",
      avatar: undefined,
    },
    mappings: "08/11/2023 às 18:15",
    status: "draft",
  },
]

export default function FormsPage() {
  const router = useRouter()
  const [selectedForms, setSelectedForms] = React.useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = React.useState(1)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedForms(new Set(formsData.map((form) => form.id)))
    } else {
      setSelectedForms(new Set())
    }
  }

  const handleSelectForm = (formId: string, checked: boolean) => {
    const newSelected = new Set(selectedForms)
    if (checked) {
      newSelected.add(formId)
    } else {
      newSelected.delete(formId)
    }
    setSelectedForms(newSelected)
  }

  const isAllSelected = selectedForms.size === formsData.length && formsData.length > 0
  const isIndeterminate = selectedForms.size > 0 && selectedForms.size < formsData.length

  const handleModeChange = (mode: "mapa" | "formularios") => {
    if (mode === "mapa") {
      router.push("/map")
    }
  }

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-background">
      {/* PrincipalBar no topo */}
      <div className="flex-shrink-0">
        <PrincipalBar 
          initialMode="formularios" 
          onModeChange={handleModeChange}
        />
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col gap-[10px] px-0 py-5 overflow-auto">
          {/* Header com título e controles */}
          <div className="flex items-center justify-between px-6">
            <div className="flex items-center justify-center">
              <p className="text-xs text-muted-foreground">Formulários</p>
            </div>
            <div className="flex items-center gap-[157px] text-xs text-muted-foreground">
              <p className="w-[157px]">Respostas</p>
              <p className="w-[243px]">Responsável</p>
              <p className="w-[186px]">Mapeamentos</p>
              <p>Status</p>
            </div>
          </div>

          {/* Tabela */}
          <div className="flex-1 flex items-start justify-between px-5">
            <div className="flex-1 flex flex-col h-full overflow-auto">
              <div className="border border-border rounded-lg overflow-hidden">
                <Table variant="bordered">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px] h-[57px] pl-3 pr-0 py-2">
                        <Checkbox
                          checked={isAllSelected}
                          onCheckedChange={handleSelectAll}
                          className={isIndeterminate ? "opacity-50" : ""}
                        />
                      </TableHead>
                      <TableHead className="min-w-[85px] h-[57px] p-2">
                        <div className="flex flex-col justify-center overflow-ellipsis overflow-hidden text-sm text-foreground whitespace-nowrap">
                          <p className="leading-5">Formulários</p>
                        </div>
                      </TableHead>
                      <TableHead className="w-[155px] h-[57px] p-2">
                        <div className="flex flex-col justify-center overflow-ellipsis overflow-hidden text-sm text-foreground whitespace-nowrap">
                          <p className="leading-5">Respostas</p>
                        </div>
                      </TableHead>
                      <TableHead className="w-[239px] h-[57px] p-2">
                        <div className="flex flex-col justify-center overflow-ellipsis overflow-hidden text-sm text-foreground whitespace-nowrap">
                          <p className="leading-5">Responsável</p>
                        </div>
                      </TableHead>
                      <TableHead className="w-[189px] h-[57px] p-2">
                        <div className="flex flex-col justify-center overflow-ellipsis overflow-hidden text-sm text-foreground whitespace-nowrap">
                          <p className="leading-5">Mapeamentos</p>
                        </div>
                      </TableHead>
                      <TableHead className="w-[117px] h-[57px] p-2">
                        <div className="flex flex-col justify-center overflow-ellipsis overflow-hidden text-sm text-foreground whitespace-nowrap">
                          <p className="leading-5">Status</p>
                        </div>
                      </TableHead>
                      <TableHead className="w-[64px] h-[57px] p-2">
                        <div className="flex flex-col justify-center overflow-ellipsis overflow-hidden text-sm text-foreground whitespace-nowrap">
                          <p className="leading-5"></p>
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formsData.map((form) => (
                      <TableRow key={form.id}>
                        <TableCell className="w-[40px] h-[57px] pl-3 pr-0 py-2">
                          <Checkbox
                            checked={selectedForms.has(form.id)}
                            onCheckedChange={(checked) => handleSelectForm(form.id, checked)}
                          />
                        </TableCell>
                        <TableCell className="min-w-[85px] h-[57px] p-2">
                          <div className="flex flex-col justify-center overflow-ellipsis overflow-hidden text-sm text-foreground whitespace-nowrap">
                            <p className="leading-5">{form.name}</p>
                          </div>
                        </TableCell>
                        <TableCell className="w-[155px] h-[57px] p-2">
                          <div className="flex flex-col justify-center overflow-ellipsis overflow-hidden text-sm text-foreground whitespace-nowrap">
                            <p className="leading-5">{form.responses}</p>
                          </div>
                        </TableCell>
                        <TableCell className="w-[239px] h-[57px] p-2">
                          <div className="flex gap-2 items-center">
                            <Avatar
                              src={form.responsible.avatar}
                              fallback={form.responsible.fallback || form.responsible.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                              size="sm"
                              className="size-6"
                            />
                            <div className="flex flex-col items-start flex-1 min-w-0">
                              <p className="text-xs font-medium text-foreground overflow-ellipsis overflow-hidden whitespace-nowrap w-full">
                                {form.responsible.name}
                              </p>
                              <p className="text-xs text-muted-foreground overflow-ellipsis overflow-hidden whitespace-nowrap w-full">
                                {form.responsible.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="w-[189px] h-[57px] p-2">
                          <div className="flex flex-col justify-center overflow-ellipsis overflow-hidden text-sm text-foreground whitespace-nowrap">
                            <p className="leading-5">{form.mappings}</p>
                          </div>
                        </TableCell>
                        <TableCell className="w-[117px] h-[57px] p-2">
                          {form.status === "published" ? (
                            <Badge
                              variant="default"
                              className="bg-green-500 text-white border-transparent gap-1 px-2 py-0.5"
                            >
                              <Check className="size-3" />
                              Publicado
                            </Badge>
                          ) : (
                            <Badge
                              variant="default"
                              className="bg-foreground text-primary-foreground border-transparent px-2 py-0.5"
                            >
                              Rascunho
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="w-[64px] h-[57px] p-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-2.5"
                          >
                            <Ellipsis className="size-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Paginação */}
              <div className="flex gap-2 items-center justify-center px-4 py-0 mt-auto">
                <div className="flex gap-1 items-center">
                  <Button
                    variant={currentPage === 1 ? "outline" : "ghost"}
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setCurrentPage(1)}
                  >
                    1
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setCurrentPage(2)}
                  >
                    2
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setCurrentPage(3)}
                  >
                    3
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                  >
                    <Ellipsis className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-9 gap-1 pl-4 pr-2.5"
                  >
                    Próximo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
