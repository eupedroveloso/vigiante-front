import { Component, inject, signal } from '@angular/core';
import { ProjectTabsComponent, ProjectTab } from '../../../../shared/components/project-tabs/project-tabs.component';
import { AssetService } from '../../../../core/services/asset.service';

@Component({
  selector: 'app-project-tabs-showcase',
  standalone: true,
  imports: [ProjectTabsComponent],
  templateUrl: './project-tabs.component.html',
  styleUrl: './project-tabs.component.scss'
})
export class ProjectTabsShowcaseComponent {
  private readonly asset = inject(AssetService);
  activeIndex = signal(0);

  tabs = signal<ProjectTab[]>([
    { id: 'projeto', label: 'Projeto', icon: '', closable: true },
    { id: 'tokens', label: 'Tokens', closable: true },
    { id: 'docs', label: 'Docs', closable: true }
  ]);

  constructor() {
    this.tabs.set([
      { id: 'projeto', label: 'Projeto', icon: this.asset.icon('folder-open.svg'), closable: true },
      { id: 'tokens', label: 'Tokens', closable: true },
      { id: 'docs', label: 'Docs', closable: true }
    ]);
  }

  onTabSelect(id: string): void {
    const list = this.tabs();
    const idx = list.findIndex(t => t.id === id);
    if (idx >= 0) this.activeIndex.set(idx);
  }

  onTabClose(id: string): void {
    this.tabs.update(list => {
      const next = list.filter(t => t.id !== id);
      const closedIdx = list.findIndex(t => t.id === id);
      let newIndex = this.activeIndex();
      if (closedIdx <= newIndex && newIndex > 0) newIndex--;
      this.activeIndex.set(Math.min(newIndex, next.length - 1));
      return next;
    });
  }

  onTabAdd(): void {
    const list = this.tabs();
    const n = list.length + 1;
    this.tabs.update(l => [
      ...l,
      { id: `aba-${n}`, label: `Nova ${n}`, closable: true }
    ]);
    this.activeIndex.set(list.length);
  }

  onHomeClick(): void {
    console.log('Home clicked');
  }
}
