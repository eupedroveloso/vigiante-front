import { Component, inject, input, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { AssetService } from '../../../core/services/asset.service';
import { ModeToolComponent, ModeToolOption } from '../mode-tool/mode-tool.component';

@Component({
  selector: 'app-tools-bar-map',
  standalone: true,
  imports: [NgClass, ModeToolComponent],
  templateUrl: './tools-bar-map.component.html',
  styleUrl: './tools-bar-map.component.scss'
})
export class ToolsBarMapComponent {
  protected readonly asset = inject(AssetService);
  protected icon(name: string): string {
    return this.asset.icon(name);
  }
  /** Valor selecionado no mode-tool (mapa / lista) */
  modeToolValue = input<string>('');
  /** Opções do mode-tool */
  modeToolOptions = input<ModeToolOption[]>([]);
  /** Quando true, não usa borda/largura total (para uso dentro da principal bar) */
  embedded = input<boolean>(false);
  /** Id do botão de ferramenta atualmente ativo (location-plus, border-inner, draw-polygon, draw-circle, layer-group) */
  activeToolId = input<string | undefined>(undefined);

  /** Clique no botão menu (bars) */
  menuClick = output<void>();
  /** Clique em um botão de função (location-plus, border-inner, draw-polygon, draw-circle, layer-group). Emite o id. */
  toolClick = output<string>();
  /** Mudança de modo no mode-tool (map/list). Emite o id. */
  modeChange = output<string>();

  onMenuClick(): void {
    this.menuClick.emit();
  }

  onToolClick(toolId: string): void {
    this.toolClick.emit(toolId);
  }

  onModeChange(id: string): void {
    this.modeChange.emit(id);
  }
}
