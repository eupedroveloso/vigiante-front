import { Component, signal } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { HlmInput } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-input-showcase',
  standalone: true,
  imports: [InputComponent, HlmInput],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputShowcaseComponent {
  textValue = signal('');
  textValueWithFocus = signal('');
  textValueError = signal('');
  textValueErrorFocus = signal('');
  searchWithIconValue = signal('');
}
