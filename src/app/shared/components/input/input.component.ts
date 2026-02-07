import { Component, computed, inject, input, output } from '@angular/core';
import { HlmInput } from '@spartan-ng/helm/input';
import { NgClass } from '@angular/common';
import { AssetService } from '../../../core/services/asset.service';

/**
 * Campo de entrada (Label + Input + Description) conforme design Figma ViconSaga.
 * Suporta estados: default, disabled, error (borda vermelha).
 */
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [HlmInput, NgClass],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  private static _idCounter = 0;
  private readonly _generatedId = `app-input-${++InputComponent._idCounter}`;

  /** Rótulo exibido acima do campo. */
  label = input<string>('Label');

  /** Placeholder do input. */
  placeholder = input<string>('Placeholder');

  /** Texto de ajuda abaixo do campo. */
  description = input<string>('This is an input description.');

  /** Desabilita o campo e deixa label/description em tom muted. */
  disabled = input<boolean>(false);

  /** Exibe estado de erro (borda vermelha). Use true para forçar ou 'auto' com formulário reativo. */
  error = input<boolean | 'auto'>(false);

  /** Tipo do input: text (padrão) ou file. */
  type = input<string>('text');

  /** Valor do input (two-way via valueChange). */
  value = input<string>('');

  /** ID do input para associar ao label (acessibilidade). */
  inputId = input<string | undefined>(undefined);

  /**
   * Ícone à esquerda (nome do arquivo em assets/icons, ex: 'magnifying-glass.svg').
   * Quando definido, exibe o ícone e um divisor vertical dentro do input.
   */
  iconLeft = input<string | undefined>(undefined);

  /** Emitido quando o valor do input muda. */
  valueChange = output<string>();

  private readonly _asset = inject(AssetService);

  protected readonly computedId = computed(() => this.inputId() ?? this._generatedId);

  protected readonly iconLeftUrl = computed(() => {
    const icon = this.iconLeft();
    return icon ? this._asset.icon(icon) : null;
  });

  protected readonly showError = computed(() => {
    const e = this.error();
    return e === true;
  });

  protected onInput(event: Event): void {
    const el = event.target as HTMLInputElement;
    this.valueChange.emit(el?.value ?? '');
  }
}
