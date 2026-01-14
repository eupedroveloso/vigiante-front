"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { ProjectTab, ProjectTabItem } from "@/components/ProjectTab"
import { ToggleModeTool } from "@/components/ToggleModeTool"
import { cn } from "@/lib/utils"
import {
  Bars,
  LocationPlus,
  BorderInner,
  DrawPolygon,
  Circle,
  LayerGroup,
  Heatmap,
  Calendar,
  ClipboardUser,
  ListTimeline,
  Bell,
  MagnifyingGlass,
  CrosshairsSimple,
  ChevronRight,
  ChevronDown,
} from "@/components/icons"

interface PrincipalBarProps {
  className?: string
  variant?: "default" | "form" | "form-edit" | "form-edit-select" | "nav-bar"
}

export function PrincipalBar({ 
  className,
  variant = "default" 
}: PrincipalBarProps) {
  const [mode, setMode] = React.useState<"mapa" | "formularios">("mapa")
  const [activeTab, setActiveTab] = React.useState("tab-1")
  
  const [tabs, setTabs] = React.useState<ProjectTabItem[]>([
    {
      id: "tab-1",
      label: "Colaboratório",
    },
    {
      id: "tab-2",
      label: "Colaboratório",
    },
    {
      id: "tab-3",
      label: "Colaboratório",
    },
  ])

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  const handleCloseTab = React.useCallback((tabId: string) => {
    setTabs((prev) => {
      const filtered = prev.filter((tab) => tab.id !== tabId)
      // Se a tab fechada era a ativa, ativar a primeira tab restante
      if (activeTab === tabId) {
        if (filtered.length > 0) {
          setActiveTab(filtered[0].id)
        } else {
          setActiveTab("")
        }
      }
      return filtered
    })
  }, [activeTab])

  const handleHomeClick = () => {
    // Lógica para navegar para home
    console.log("Home clicked")
  }

  // Atualizar tabs com callbacks de fechamento
  const tabsWithCallbacks = React.useMemo(() => {
    return tabs.map((tab) => ({
      ...tab,
      onClose: () => handleCloseTab(tab.id),
    }))
  }, [tabs, handleCloseTab])

  return (
    <div className={cn("flex flex-col w-full", className)}>
      {/* Tabs Section */}
      <div className="bg-black flex items-start w-full">
        <ProjectTab
          tabs={tabsWithCallbacks}
          activeTabId={activeTab}
          onTabChange={handleTabChange}
          onHomeClick={handleHomeClick}
        />
      </div>

      {/* Tools Bar */}
      <div className="bg-background border-b border-border flex items-center justify-between w-full">
        <div className="flex items-center w-[748px]">
          {/* Menu Button */}
          <div className="border-r border-border flex items-center justify-center px-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bars size={18} />
            </Button>
          </div>

          {/* Mode Toggle */}
          <div className="border-r border-border flex items-center justify-center px-3">
            <ToggleModeTool
              mode={mode}
              onModeChange={setMode}
            />
          </div>

          {/* Map Tools */}
          <div className="bg-background flex gap-2 items-center justify-center px-3 py-2 rounded-2xl">
            <Button size="icon" className="h-9 w-9 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg">
              <LocationPlus size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <BorderInner size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <DrawPolygon size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Circle size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <LayerGroup size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Heatmap size={18} />
            </Button>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex gap-2 items-center justify-center px-4">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <CrosshairsSimple size={18} />
          </Button>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-r-none border-r-0"
            >
              <MagnifyingGlass size={18} />
            </Button>
            <Input
              placeholder="Buscar local"
              className="h-9 w-[269px] rounded-l-none border-l-0"
            />
          </div>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Bell size={18} />
          </Button>
        </div>
      </div>

      {/* Breadcrumb Section */}
      <div className="bg-background border-b border-border flex items-center px-0 w-full">
        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center pl-4 pr-4">
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

          {/* Right Actions */}
          <div className="flex gap-2 items-center px-1">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Calendar size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ClipboardUser size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ListTimeline size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
