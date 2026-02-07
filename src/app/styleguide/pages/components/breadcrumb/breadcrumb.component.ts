import { Component } from '@angular/core';
import {
  BreadcrumbComponent,
  type BreadcrumbItem,
} from '../../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-breadcrumb-showcase',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbShowcaseComponent {
  /** Exemplo que replica o design do Figma: Breadcrumb > ... > Breadcrumb ⌄ > Breadcrumb */
  figmaExampleItems: BreadcrumbItem[] = [
    { label: 'Breadcrumb', routerLink: '/styleguide' },
    { ellipsis: true },
    { label: 'Breadcrumb', routerLink: '/styleguide/icons', showDropdown: true },
    { label: 'Breadcrumb' },
  ];

  /** Exemplo simples sem ellipsis nem dropdown */
  simpleItems: BreadcrumbItem[] = [
    { label: 'Início', routerLink: '/styleguide' },
    { label: 'Componentes', routerLink: '/styleguide/components/mode-tool' },
    { label: 'Breadcrumb' },
  ];

  /** Exemplo com vários níveis e ellipsis */
  deepItems: BreadcrumbItem[] = [
    { label: 'Projetos', routerLink: '/styleguide' },
    { ellipsis: true },
    { label: 'Projeto A', routerLink: '/styleguide', showDropdown: true },
    { label: 'Documentos', routerLink: '/styleguide' },
    { label: 'Documento atual' },
  ];
}
