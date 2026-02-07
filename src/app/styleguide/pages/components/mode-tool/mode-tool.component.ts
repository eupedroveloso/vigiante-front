import { Component, inject, signal } from '@angular/core';
import { ModeToolComponent, ModeToolOption } from '../../../../shared/components/mode-tool/mode-tool.component';
import { AssetService } from '../../../../core/services/asset.service';

@Component({
  selector: 'app-mode-tool-showcase',
  standalone: true,
  imports: [ModeToolComponent],
  templateUrl: './mode-tool.component.html',
  styleUrl: './mode-tool.component.scss'
})
export class ModeToolShowcaseComponent {
  private readonly asset = inject(AssetService);
  selectedMode = signal<string>('map');
  options: ModeToolOption[] = [
    { id: 'map', icon: '', label: 'Visualização mapa' },
    { id: 'list', icon: '', label: 'Visualização lista' }
  ];

  constructor() {
    this.options = [
      { id: 'map', icon: this.asset.icon('map.svg'), label: 'Visualização mapa' },
      { id: 'list', icon: this.asset.icon('list.svg'), label: 'Visualização lista' }
    ];
  }

  onModeChange(id: string): void {
    this.selectedMode.set(id);
    console.log('Mode changed:', id);
  }
}
