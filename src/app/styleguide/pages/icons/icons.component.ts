import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconService, Icon } from '../../../core/services/icon.service';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.scss'
})
export class IconsComponent {
  private iconService = inject(IconService);
  
  searchQuery = signal<string>('');
  selectedCategory = signal<string>('all');
  
  categories = ['all', 'shapes', 'arrows', 'ui', 'actions', 'other'];

  filteredIcons = computed(() => {
    let filtered = this.iconService.getAllIcons();

    if (this.selectedCategory() !== 'all') {
      filtered = filtered.filter(icon => icon.category === this.selectedCategory());
    }

    const query = this.searchQuery().toLowerCase();
    if (query) {
      filtered = this.iconService.searchIcons(query).filter(icon => {
        if (this.selectedCategory() !== 'all') {
          return icon.category === this.selectedCategory();
        }
        return true;
      });
    }

    return filtered;
  });

  copyToClipboard(iconName: string, iconPath: string): void {
    const code = `<img src="${iconPath}" alt="${iconName}" />`;
    navigator.clipboard.writeText(code).then(() => {
      console.log('Copied to clipboard:', code);
    });
  }

  getIconPath(icon: Icon): string {
    return icon.path;
  }
}
