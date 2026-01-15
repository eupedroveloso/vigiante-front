export interface NavItem {
  name: string
  href: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const navigation: NavSection[] = [
  {
    title: "Foundation",
    items: [
      { name: "Design Tokens", href: "/styleguide" },
      { name: "Icons", href: "/styleguide/components/icons" },
      { name: "Ícones Personalizados", href: "/styleguide/components/icons-personalizados" },
    ]
  },
          {
            title: "Components",
            items: [
              { name: "Principal Bar", href: "/styleguide/components/principal-bar" },
              { name: "Project Tab", href: "/styleguide/components/project-tab" },
              { name: "Toggle Mode Tool", href: "/styleguide/components/toggle-mode-tool" },
              { name: "Map Tools", href: "/styleguide/components/map-tools" },
              { name: "Map Mode View", href: "/styleguide/components/map-mode-view" },
              { name: "Breadcrumb", href: "/styleguide/components/breadcrumb" },
              { name: "Table", href: "/styleguide/components/table" },
              { name: "Table Cell", href: "/styleguide/components/table-cell" },
              { name: "Toggle", href: "/styleguide/components/toggle" },
              { name: "Switch", href: "/styleguide/components/switch" },
              { name: "Tooltip", href: "/styleguide/components/tooltip" },
            ]
          }
]
