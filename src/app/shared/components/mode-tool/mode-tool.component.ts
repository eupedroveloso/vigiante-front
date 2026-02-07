import { Component, input, output, model } from '@angular/core';
import { NgClass } from '@angular/common';

export interface ModeToolOption {
  id: string;
  icon: string;
  label?: string;
}

@Component({
  selector: 'app-mode-tool',
  standalone: true,
  imports: [NgClass],
  templateUrl: './mode-tool.component.html',
  styleUrl: './mode-tool.component.scss'
})
export class ModeToolComponent {
  /** Opções do seletor (ex: mapa, lista) */
  options = input<ModeToolOption[]>([]);
  /** Valor selecionado (id da opção). Two-way binding com model(). */
  value = model<string>('');
  /** Desabilitado */
  disabled = input<boolean>(false);

  /** Emitido quando a seleção muda */
  valueChange = output<string>();

  isSelected(option: ModeToolOption): boolean {
    return this.value() === option.id;
  }

  select(option: ModeToolOption): void {
    if (this.disabled()) return;
    this.value.set(option.id);
    this.valueChange.emit(option.id);
  }
}
