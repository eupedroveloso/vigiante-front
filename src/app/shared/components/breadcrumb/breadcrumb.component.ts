import { Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';
import {
  HlmBreadcrumb,
  HlmBreadcrumbEllipsis,
  HlmBreadcrumbItem,
  HlmBreadcrumbLink,
  HlmBreadcrumbList,
  HlmBreadcrumbPage,
  HlmBreadcrumbSeparator,
} from '@spartan-ng/helm/breadcrumb';

export interface BreadcrumbItem {
  /** Rótulo do item. Omitir quando ellipsis for true. */
  label?: string;
  /** Link de navegação. Se omitido, o item é tratado como página atual (último). */
  routerLink?: string | string[];
  /** Exibe ícone de dropdown (chevron down) ao lado do item. */
  showDropdown?: boolean;
  /** Se true, renderiza reticências (...) no lugar do item. */
  ellipsis?: boolean;
}

export type BreadcrumbNode =
  | { type: 'link'; label: string; routerLink: string | string[]; showDropdown?: boolean }
  | { type: 'page'; label: string }
  | { type: 'ellipsis' };

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [
    HlmBreadcrumb,
    HlmBreadcrumbList,
    HlmBreadcrumbItem,
    HlmBreadcrumbLink,
    HlmBreadcrumbPage,
    HlmBreadcrumbSeparator,
    HlmBreadcrumbEllipsis,
    NgIcon,
  ],
  providers: [provideIcons({ lucideChevronDown })],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  /** Lista de itens do breadcrumb. Último item sem routerLink = página atual (negrito). */
  items = input.required<BreadcrumbItem[]>();

  /** Texto acessível para o container de navegação. */
  ariaLabel = input<string>('breadcrumb');

  protected readonly nodes = computed<BreadcrumbNode[]>(() => {
    const list = this.items();
    return list.map((item): BreadcrumbNode => {
      if (item.ellipsis) return { type: 'ellipsis' };
      if (item.routerLink != null)
        return {
          type: 'link',
          label: item.label ?? '',
          routerLink: item.routerLink,
          showDropdown: item.showDropdown,
        };
      return { type: 'page', label: item.label ?? '' };
    });
  });
}
