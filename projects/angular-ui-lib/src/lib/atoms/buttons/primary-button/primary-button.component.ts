import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseButtonComponent, ButtonSize, ButtonState } from '../base-button/base-button.component';

@Component({
  selector: 'lib-primary-button',
  standalone: true,
  imports: [CommonModule, BaseButtonComponent],
  // template: `<h1>hiiii</h1>`,
  templateUrl: './primary-button.component.html',
})
export class PrimaryButtonComponent  implements OnInit {
  @Input() variant: string = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() state: ButtonState = 'idle';
  @Input() disabled = false;
  @Input() type : 'button' | 'submit' | 'reset' = 'button';
  @Input() iconRight = false;
  @Input() preventMultipleClicks = false;
  @Input() clickCooldownMs = 500;

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  ngOnInit(): void {

    console.log('PrimatryButtonComponent Initial mode!');

  }
  handleClick(event: MouseEvent): void {
    this.buttonClick.emit(event);
  }
}
