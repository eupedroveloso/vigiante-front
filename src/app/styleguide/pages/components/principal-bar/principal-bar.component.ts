import { Component, inject, signal } from '@angular/core';
import {
  PrincipalBarComponent,
  PrincipalBarAction,
  PrincipalBarBreadcrumbAction,
} from '../../../../shared/components/principal-bar/principal-bar.component';
import { ProjectTab } from '../../../../shared/components/project-tabs/project-tabs.component';
import { BreadcrumbItem } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { ModeToolOption } from '../../../../shared/components/mode-tool/mode-tool.component';
import { AssetService } from '../../../../core/services/asset.service';

@Component({
  selector: 'app-principal-bar-showcase',
  standalone: true,
  imports: [PrincipalBarComponent],
  templateUrl: './principal-bar.component.html',
  styleUrl: './principal-bar.component.scss'
})
export class PrincipalBarShowcaseComponent {
  private readonly asset = inject(AssetService);
  searchValue = signal<string>('');

  // Project tabs (barra escura - Figma 309-1542)
  projectTabs = signal<ProjectTab[]>([
    { id: 'projeto1', label: 'Projeto', icon: '', closable: true },
    { id: 'projeto2', label: 'Projeto', icon: '', closable: true },
  ]);
  activeProjectTabIndex = signal(0);

  // Breadcrumb (barra abaixo da toolbar)
  breadcrumbItems = signal<BreadcrumbItem[]>([
    { label: 'Projetos', routerLink: '#' },
    { ellipsis: true },
    { label: 'Focos de Dengue - Brasilia', routerLink: '#' },
    { label: 'Teste' },
  ]);
  breadcrumbRightActions = signal<PrincipalBarBreadcrumbAction[]>([
    { id: 'calendar', icon: 'calendar.svg', label: 'Calendário' },
    { id: 'doc', icon: 'file.svg', label: 'Documento' },
    { id: 'stack', icon: 'layer-group.svg', label: 'Camadas' },
  ]);

  // Ações (ícones de ferramenta - Figma mode-tool)
  defaultActions = signal<PrincipalBarAction[]>([
    { id: 'map', icon: '', label: 'Mapa' },
    { id: 'list', icon: '', label: 'Lista' },
    { id: 'location-plus', icon: '', label: 'Adicionar Local', active: true },
    { id: 'expand', icon: '', label: 'Expandir' },
    { id: 'rotate', icon: '', label: 'Rotacionar' },
    { id: 'layers', icon: '', label: 'Camadas' }
  ]);

  // Mode tool (seletor mapa / lista compacto)
  modeToolOptions: ModeToolOption[] = [
    { id: 'map', icon: '', label: 'Mapa' },
    { id: 'list', icon: '', label: 'Lista' }
  ];

  constructor() {
    this.projectTabs.set([
      { id: 'projeto1', label: 'Projeto', icon: this.asset.icon('map.svg'), closable: true },
      { id: 'projeto2', label: 'Projeto', icon: this.asset.icon('map.svg'), closable: true },
    ]);
    this.defaultActions.set([
      { id: 'map', icon: this.asset.icon('map.svg'), label: 'Mapa' },
      { id: 'list', icon: this.asset.icon('list.svg'), label: 'Lista' },
      { id: 'location-plus', icon: this.asset.icon('location-plus.svg'), label: 'Adicionar Local', active: true },
      { id: 'expand', icon: this.asset.icon('expand.svg'), label: 'Expandir' },
      { id: 'rotate', icon: this.asset.icon('rotate-right.svg'), label: 'Rotacionar' },
      { id: 'layers', icon: this.asset.icon('layer-group.svg'), label: 'Camadas' }
    ]);
    this.modeToolOptions = [
      { id: 'map', icon: this.asset.icon('map.svg'), label: 'Mapa' },
      { id: 'list', icon: this.asset.icon('list.svg'), label: 'Lista' }
    ];
  }
  modeToolValue = signal('map');
  activeToolsBarMapToolId = signal<string | undefined>('draw-polygon');

  onMenuToggle(): void {
    console.log('Menu toggle clicked');
  }

  onActionClick(actionId: string): void {
    console.log('Action clicked:', actionId);
    this.defaultActions.update(actions => 
      actions.map(action => ({
        ...action,
        active: action.id === actionId
      }))
    );
  }

  onToolsBarMapToolClick(toolId: string): void {
    console.log('Tools bar map tool clicked:', toolId);
    this.activeToolsBarMapToolId.set(toolId);
  }

  onSearchChange(value: string): void {
    this.searchValue.set(value);
    console.log('Search changed:', value);
  }

  onNotificationClick(): void {
    console.log('Notification clicked');
  }

  onModeToolChange(id: string): void {
    this.modeToolValue.set(id);
    console.log('Mode tool changed:', id);
  }

  onProjectTabSelect(id: string): void {
    const list = this.projectTabs();
    const idx = list.findIndex(t => t.id === id);
    if (idx >= 0) this.activeProjectTabIndex.set(idx);
  }

  onProjectTabClose(id: string): void {
    const list = this.projectTabs();
    const closedIdx = list.findIndex(t => t.id === id);
    this.projectTabs.update(l => l.filter(t => t.id !== id));
    const next = this.projectTabs();
    let idx = this.activeProjectTabIndex();
    if (closedIdx <= idx && idx > 0) idx--;
    this.activeProjectTabIndex.set(Math.min(idx, Math.max(0, next.length - 1)));
  }

  onProjectTabAdd(): void {
    const list = this.projectTabs();
    const n = list.length + 1;
    const newTab: ProjectTab = {
      id: `projeto${n}`,
      label: 'Nova aba',
      icon: this.asset.icon('map.svg'),
      closable: true,
    };
    this.projectTabs.update(l => [...l, newTab]);
    this.activeProjectTabIndex.set(list.length);
  }

  onBreadcrumbActionClick(actionId: string): void {
    console.log('Breadcrumb action clicked:', actionId);
  }
}
