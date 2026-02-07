import { Component, inject, signal } from '@angular/core';
import { ToolsBarMapComponent } from '../../../../shared/components/tools-bar-map/tools-bar-map.component';
import { ModeToolOption } from '../../../../shared/components/mode-tool/mode-tool.component';
import { AssetService } from '../../../../core/services/asset.service';

@Component({
  selector: 'app-tools-bar-map-showcase',
  standalone: true,
  imports: [ToolsBarMapComponent],
  templateUrl: './tools-bar-map.component.html',
  styleUrl: './tools-bar-map.component.scss'
})
export class ToolsBarMapShowcaseComponent {
  private readonly asset = inject(AssetService);
  modeValue = signal<string>('map');

  modeOptions: ModeToolOption[] = [
    { id: 'map', icon: '', label: 'Mapa' },
    { id: 'list', icon: '', label: 'Lista' }
  ];

  constructor() {
    this.modeOptions = [
      { id: 'map', icon: this.asset.icon('map.svg'), label: 'Mapa' },
      { id: 'list', icon: this.asset.icon('list.svg'), label: 'Lista' }
    ];
  }

  onMenuClick(): void {
    console.log('Menu clicked');
  }

  onToolClick(toolId: string): void {
    console.log('Tool clicked:', toolId);
  }

  onModeChange(id: string): void {
    this.modeValue.set(id);
    console.log('Mode changed:', id);
  }
}
