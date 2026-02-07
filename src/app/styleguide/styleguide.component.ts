import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AssetService } from '../core/services/asset.service';
import { NAVIGATION_CONFIG, NavSection } from './navigation.config';

@Component({
  selector: 'app-styleguide',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './styleguide.component.html',
  styleUrl: './styleguide.component.scss'
})
export class StyleguideComponent {
  private readonly asset = inject(AssetService);
  navigationConfig: NavSection[] = NAVIGATION_CONFIG;

  logoUrl = this.asset.icon('custom/vigiante-logo.svg');
}
