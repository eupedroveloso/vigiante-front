import { inject, Injectable } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

/**
 * Retorna URLs absolutas para assets, garantindo que ícones e outros arquivos
 * carreguem corretamente independente do base href ou do ambiente (dev/build).
 */
@Injectable({ providedIn: 'root' })
export class AssetService {
  private readonly baseHref = inject(APP_BASE_HREF, { optional: true }) ?? '/';

  /**
   * Caminho absoluto para um ícone em assets/icons.
   * Ex: assetIcon('map.svg') → '/assets/icons/map.svg' (ou base + assets/icons/map.svg)
   */
  icon(name: string): string {
    const trimmed = name.replace(/^\/+/, '');
    const path = trimmed.startsWith('assets/') ? trimmed : `assets/icons/${trimmed}`;
    const base = this.baseHref.endsWith('/') ? this.baseHref.slice(0, -1) : this.baseHref;
    return `${base}/${path}`;
  }
}
