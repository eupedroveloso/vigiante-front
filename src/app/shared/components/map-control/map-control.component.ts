import { Component, inject, input, output } from '@angular/core';
import { AssetService } from '../../../core/services/asset.service';

/**
 * Painel vertical de controles de mapa (Figma ViconSaga 616-7299).
 * Agrupa: fullscreen, zoom in, zoom out, street view e miniatura do mapa base.
 */
@Component({
  selector: 'app-map-control',
  standalone: true,
  imports: [],
  templateUrl: './map-control.component.html',
  styleUrl: './map-control.component.scss'
})
export class MapControlComponent {
  protected readonly asset = inject(AssetService);

  /** Exibe o botão de tela cheia */
  showFullscreen = input<boolean>(true);
  /** Exibe os botões de zoom */
  showZoom = input<boolean>(true);
  /** Exibe o botão de Street View (Pegman) */
  showStreetView = input<boolean>(true);
  /** Exibe a área da miniatura do mapa base */
  showBaseMapThumbnail = input<boolean>(true);
  /** URL da imagem de miniatura do mapa base (opcional). */
  baseMapThumbnailUrl = input<string | undefined>(undefined);

  fullscreenClick = output<void>();
  zoomInClick = output<void>();
  zoomOutClick = output<void>();
  streetViewClick = output<void>();
  baseMapThumbnailClick = output<void>();

  protected icon(name: string): string {
    return this.asset.icon(name);
  }

  onFullscreenClick(): void {
    this.fullscreenClick.emit();
  }

  onZoomInClick(): void {
    this.zoomInClick.emit();
  }

  onZoomOutClick(): void {
    this.zoomOutClick.emit();
  }

  onStreetViewClick(): void {
    this.streetViewClick.emit();
  }

  onBaseMapThumbnailClick(): void {
    this.baseMapThumbnailClick.emit();
  }
}
