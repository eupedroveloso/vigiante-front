import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-component-detail',
  standalone: true,
  template: `
    <div class="p-8">
      <h1 class="text-3xl font-bold">{{ componentName() }}</h1>
      <p class="text-muted-foreground mt-2">
        Documentação detalhada será adicionada no Prompt 2.
      </p>
    </div>
  `
})
export class ComponentDetailComponent {
  private route = inject(ActivatedRoute);
  
  componentName = toSignal(
    this.route.params.pipe(map(params => params['name'])),
    { initialValue: '' }
  );
}
