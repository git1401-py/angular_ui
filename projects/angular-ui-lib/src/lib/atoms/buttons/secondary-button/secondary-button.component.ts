import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseButtonComponent, ButtonSize, ButtonState } from '../base-button/base-button.component';

@Component({
  selector: 'lib-secondary-button',
  standalone: true,
  imports: [CommonModule, BaseButtonComponent],
  templateUrl: './secondary-button.component.html',
})
export class SecondaryButtonComponent {
  @Input() variant: string = 'secondary'; // اینجا از "secondary" استفاده می‌کنیم
  @Input() size: ButtonSize = 'md';
  @Input() state: ButtonState = 'idle';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() iconRight = false;
  @Input() preventMultipleClicks = false;
  @Input() clickCooldownMs = 500;

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  handleClick(event: MouseEvent): void {
    this.buttonClick.emit(event);
  }
}
