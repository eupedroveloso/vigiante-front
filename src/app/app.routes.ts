import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/styleguide',
    pathMatch: 'full'
  },
  {
    path: 'styleguide',
    loadComponent: () => 
      import('./styleguide/styleguide.component').then(m => m.StyleguideComponent),
    children: [
      {
        path: '',
        loadComponent: () => 
          import('./styleguide/pages/styleguide/styleguide.component').then(m => m.StyleguidePageComponent)
      },
      {
        path: 'tokens',
        loadComponent: () => 
          import('./styleguide/pages/tokens/tokens.component').then(m => m.TokensComponent)
      },
      {
        path: 'icons',
        loadComponent: () =>
          import('./styleguide/pages/icons/icons.component').then(m => m.IconsComponent)
      },
      {
        path: 'icons-custom',
        loadComponent: () =>
          import('./styleguide/pages/icons-custom/icons-custom.component').then(m => m.IconsCustomComponent)
      },
      {
        path: 'typography',
        loadComponent: () => 
          import('./styleguide/pages/typography/typography.component').then(m => m.TypographyComponent)
      },
      {
        path: 'components/tools-bar-map',
        loadComponent: () => 
          import('./styleguide/pages/components/tools-bar-map/tools-bar-map.component')
            .then(m => m.ToolsBarMapShowcaseComponent)
      },
      {
        path: 'components/principal-bar',
        loadComponent: () => 
          import('./styleguide/pages/components/principal-bar/principal-bar.component')
            .then(m => m.PrincipalBarShowcaseComponent)
      },
      {
        path: 'components/project-tabs',
        loadComponent: () => 
          import('./styleguide/pages/components/project-tabs/project-tabs.component')
            .then(m => m.ProjectTabsShowcaseComponent)
      },
      {
        path: 'components/mode-tool',
        loadComponent: () => 
          import('./styleguide/pages/components/mode-tool/mode-tool.component')
            .then(m => m.ModeToolShowcaseComponent)
      },
      {
        path: 'components/breadcrumb',
        loadComponent: () => 
          import('./styleguide/pages/components/breadcrumb/breadcrumb.component')
            .then(m => m.BreadcrumbShowcaseComponent)
      },
      {
        path: 'components/input',
        loadComponent: () => 
          import('./styleguide/pages/components/input/input.component')
            .then(m => m.InputShowcaseComponent)
      },
      {
        path: 'components/map-control',
        loadComponent: () => 
          import('./styleguide/pages/components/map-control/map-control.component')
            .then(m => m.MapControlShowcaseComponent)
      },
      {
        path: 'components/:name',
        loadComponent: () => 
          import('./styleguide/pages/component-detail/component-detail.component')
            .then(m => m.ComponentDetailComponent)
      }
    ]
  }
];

