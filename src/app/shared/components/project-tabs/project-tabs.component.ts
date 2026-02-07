import { Component, inject, input, output, signal, computed } from '@angular/core';
import { NgClass } from '@angular/common';
import { AssetService } from '../../../core/services/asset.service';

export interface ProjectTab {
  id: string;
  label: string;
  icon?: string;
  closable?: boolean;
}

@Component({
  selector: 'app-project-tabs',
  standalone: true,
  imports: [NgClass],
  templateUrl: './project-tabs.component.html',
  styleUrl: './project-tabs.component.scss'
})
export class ProjectTabsComponent {
  private readonly asset = inject(AssetService);
  protected icon(name: string): string {
    return this.asset.icon(name);
  }

  /** Exibe o botão home à esquerda */
  showHome = input<boolean>(true);
  /** Lista de abas */
  tabs = input<ProjectTab[]>([]);
  /** Índice da aba ativa (0-based) */
  activeIndex = input<number>(0);
  /** Variante de fundo: 'dark' para barra escura, 'light' para barra clara */
  variant = input<'dark' | 'light'>('dark');
  /** Exibe o botão de adicionar aba (+) */
  showAddButton = input<boolean>(false);

  /** Emitido ao clicar em uma aba */
  tabSelect = output<string>();
  /** Emitido ao clicar no X para fechar uma aba */
  tabClose = output<string>();
  /** Emitido ao clicar no botão home */
  homeClick = output<void>();
  /** Emitido ao clicar no botão adicionar aba (+) */
  tabAdd = output<void>();

  /** Aba ativa atual */
  activeTabId = computed(() => {
    const list = this.tabs();
    const idx = this.activeIndex();
    return list[idx]?.id ?? list[0]?.id ?? '';
  });

  isActive(tab: ProjectTab): boolean {
    return tab.id === this.activeTabId();
  }

  onTabClick(tab: ProjectTab): void {
    this.tabSelect.emit(tab.id);
  }

  onClose(e: Event, tab: ProjectTab): void {
    e.stopPropagation();
    this.tabClose.emit(tab.id);
  }

  onHomeClick(): void {
    this.homeClick.emit();
  }

  onAddClick(): void {
    this.tabAdd.emit();
  }
}
