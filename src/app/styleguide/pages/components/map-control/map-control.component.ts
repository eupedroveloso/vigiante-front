import { Component, inject } from '@angular/core';
import { MapControlComponent } from '../../../../shared/components/map-control/map-control.component';
import { AssetService } from '../../../../core/services/asset.service';

@Component({
  selector: 'app-map-control-showcase',
  standalone: true,
  imports: [MapControlComponent],
  templateUrl: './map-control.component.html',
  styleUrl: './map-control.component.scss'
})
export class MapControlShowcaseComponent {
  private readonly asset = inject(AssetService);

  /** URL de exemplo para miniatura do mapa (ícone custom terreno) */
  thumbnailUrl = this.asset.icon('custom/terreno.png');

  onFullscreenClick(): void {
    console.log('Fullscreen clicked');
  }

  onZoomInClick(): void {
    console.log('Zoom in clicked');
  }

  onZoomOutClick(): void {
    console.log('Zoom out clicked');
  }

  onStreetViewClick(): void {
    console.log('Street view clicked');
  }

  onBaseMapThumbnailClick(): void {
    console.log('Base map thumbnail clicked');
  }
}
