export interface NavItem {
  label: string;
  route: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const NAVIGATION_CONFIG: NavSection[] = [
  {
    title: 'Styleguide',
    items: [
      { label: 'Visão geral', route: '/styleguide' },
    ]
  },
  {
    title: 'Foundation',
    items: [
      { label: 'Design Tokens', route: '/styleguide/tokens' },
      { label: 'Tipografia', route: '/styleguide/typography' },
      { label: 'Icons', route: '/styleguide/icons' },
      { label: 'Ícones personalizados', route: '/styleguide/icons-custom' },
    ]
  },
  {
    title: 'Components',
    items: [
      { label: 'Breadcrumb', route: '/styleguide/components/breadcrumb' },
      { label: 'Input', route: '/styleguide/components/input' },
      { label: 'Tools Bar Map', route: '/styleguide/components/tools-bar-map' },
      { label: 'Principal Bar', route: '/styleguide/components/principal-bar' },
      { label: 'Project Tabs', route: '/styleguide/components/project-tabs' },
      { label: 'Mode Tool', route: '/styleguide/components/mode-tool' },
      { label: 'Map Control', route: '/styleguide/components/map-control' },
    ]
  }
];
