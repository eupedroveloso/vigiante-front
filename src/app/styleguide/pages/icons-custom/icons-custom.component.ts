import { Component, inject } from '@angular/core';
import { AssetService } from '../../../core/services/asset.service';

export type CustomAssetType = 'svg' | 'png' | 'jpg';

export interface CustomIconAsset {
  id: string;
  name: string;
  /** Nome do arquivo em assets/icons/custom/ (ex: heatmap.svg, street-view.svg) */
  file: string;
  type: CustomAssetType;
  description?: string;
}

@Component({
  selector: 'app-icons-custom',
  standalone: true,
  imports: [],
  templateUrl: './icons-custom.component.html',
  styleUrl: './icons-custom.component.scss'
})
export class IconsCustomComponent {
  private readonly asset = inject(AssetService);

  /** Ícones e ilustrações personalizados (aparência mais detalhada: SVG ilustrativos, PNG, JPG). */
  customAssets: CustomIconAsset[] = [
    { id: 'heatmap', name: 'Heatmap', file: 'custom/heatmap.svg', type: 'svg', description: 'Ilustração de mapa de calor' },
    { id: 'street-view', name: 'Street view', file: 'custom/street-view.svg', type: 'svg', description: 'Ilustração de vista de rua / pessoa' },
    { id: 'gps', name: 'GPS', file: 'custom/gps.png', type: 'png', description: 'Ícone de GPS / localização' },
    { id: 'satellite', name: 'Satellite', file: 'custom/satellite.png', type: 'png', description: 'Vista satélite / mapa aéreo' },
    { id: 'terreno', name: 'Terreno', file: 'custom/terreno.png', type: 'png', description: 'Vista de terreno / topografia' },
  ];

  getAssetUrl(item: CustomIconAsset): string {
    return this.asset.icon(item.file);
  }

  copyToClipboard(item: CustomIconAsset): void {
    const path = this.getAssetUrl(item);
    const code = `<img src="${path}" alt="${item.name}" />`;
    navigator.clipboard.writeText(code).then(() => {
      console.log('Copied to clipboard:', code);
    });
  }
}
