import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NAVIGATION_CONFIG, NavSection } from '../../navigation.config';

@Component({
  selector: 'app-styleguide-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './styleguide.component.html',
  styleUrl: './styleguide.component.scss',
})
export class StyleguidePageComponent {
  navigationConfig: NavSection[] = NAVIGATION_CONFIG;
}
