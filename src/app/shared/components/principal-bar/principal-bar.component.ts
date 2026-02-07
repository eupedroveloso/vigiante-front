import { Component, inject, input, output, signal } from '@angular/core';
import { AssetService } from '../../../core/services/asset.service';
import { ProjectTabsComponent, ProjectTab } from '../project-tabs/project-tabs.component';
import { ModeToolComponent, ModeToolOption } from '../mode-tool/mode-tool.component';
import { ToolsBarMapComponent } from '../tools-bar-map/tools-bar-map.component';
import { InputComponent } from '../input/input.component';
import { BreadcrumbComponent, BreadcrumbItem } from '../breadcrumb/breadcrumb.component';

export interface PrincipalBarAction {
  id: string;
  icon: string;
  label?: string;
  active?: boolean;
  disabled?: boolean;
}

export interface PrincipalBarBreadcrumbAction {
  id: string;
  icon: string;
  label?: string;
}

@Component({
  selector: 'app-principal-bar',
  standalone: true,
  imports: [ProjectTabsComponent, ModeToolComponent, ToolsBarMapComponent, InputComponent, BreadcrumbComponent],
  templateUrl: './principal-bar.component.html',
  styleUrl: './principal-bar.component.scss'
})
export class PrincipalBarComponent {
  // Inputs - Principal Bar
  showMenuToggle = input<boolean>(true);
  actions = input<PrincipalBarAction[]>([]);
  searchPlaceholder = input<string>('Buscar local');
  showSearch = input<boolean>(true);
  showNotifications = input<boolean>(true);

  // Inputs - Project Tabs (barra escura superior - Figma 309-1542)
  showProjectTabs = input<boolean>(true);
  projectTabs = input<ProjectTab[]>([]);
  activeProjectTabIndex = input<number>(0);

  // Inputs - Mode Tool (map/list na barra principal)
  showModeTool = input<boolean>(true);
  modeToolOptions = input<ModeToolOption[]>([]);
  modeToolValue = input<string>('');

  /** Usa o componente tools-bar-map (menu + mode-tool + ícones: border-inner, draw-polygon, draw-circle, layer-group) em vez de menu + mode-tool + actions. */
  showToolsBarMap = input<boolean>(false);
  /** Id do botão ativo do tools-bar-map (border-inner | draw-polygon | draw-circle | layer-group). */
  activeToolsBarMapToolId = input<string | undefined>(undefined);

  /** Exibe o botão de adicionar aba (+) na barra de project tabs */
  showProjectTabsAddButton = input<boolean>(false);

  // Inputs - Breadcrumb (barra abaixo da toolbar - Figma 309-1542)
  showBreadcrumb = input<boolean>(true);
  breadcrumbItems = input<BreadcrumbItem[]>([]);
  breadcrumbRightActions = input<PrincipalBarBreadcrumbAction[]>([]);

  // Outputs - Principal Bar
  menuToggleClick = output<void>();
  actionClick = output<string>();
  searchChange = output<string>();
  /** Clique no botão de localização (crosshairs) antes do input de busca */
  locationCrosshairsClick = output<void>();
  notificationClick = output<void>();

  // Outputs - Project Tabs
  projectTabSelect = output<string>();
  projectTabClose = output<string>();
  projectTabAdd = output<void>();

  // Outputs - Mode Tool
  modeToolChange = output<string>();

  // Outputs - Breadcrumb actions (ícones à direita do breadcrumb)
  breadcrumbActionClick = output<string>();

  // Internal state
  searchValue = signal<string>('');
  private readonly _asset = inject(AssetService);

  protected icon(name: string): string {
    return this._asset.icon(name);
  }

  onMenuToggle(): void {
    this.menuToggleClick.emit();
  }

  onActionClick(actionId: string): void {
    this.actionClick.emit(actionId);
  }

  onToolsBarMapToolClick(toolId: string): void {
    this.actionClick.emit(toolId);
  }

  onSearchChange(value: string): void {
    this.searchValue.set(value);
    this.searchChange.emit(value);
  }

  onLocationCrosshairsClick(): void {
    this.locationCrosshairsClick.emit();
  }

  onNotificationClick(): void {
    this.notificationClick.emit();
  }

  onProjectTabSelect(id: string): void {
    this.projectTabSelect.emit(id);
  }

  onProjectTabClose(id: string): void {
    this.projectTabClose.emit(id);
  }

  onProjectTabAdd(): void {
    this.projectTabAdd.emit();
  }

  onModeToolChange(id: string): void {
    this.modeToolChange.emit(id);
  }

  onBreadcrumbActionClick(actionId: string): void {
    this.breadcrumbActionClick.emit(actionId);
  }
}
