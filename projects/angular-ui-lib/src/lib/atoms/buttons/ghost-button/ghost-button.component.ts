import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BaseButtonComponent, ButtonSize, ButtonState, ButtonVariant} from '../base-button/base-button.component';

@Component({
  selector: 'lib-ghost-button',
  standalone: true,
  imports: [CommonModule, BaseButtonComponent],
  template: `
    <lib-base-button
      [label]="label"
      [variant]="variant"
      [rounded]="rounded"
      [size]="size"
      [state]="state"
      [disabled]="disabled"
      [type]="type"
      [preventMultipleClicks]="preventMultipleClicks"
      [clickCooldownMs]="clickCooldownMs"
      [iconRight]="iconRight"
      [textColor]="textColor"
      [backgroundColor]="backgroundColor"
      (buttonClick)="handleClick($event)"
    >
      <ng-content></ng-content>
      <ng-content select="[iconRight]" *ngIf="iconRight"></ng-content>
      <ng-content select="[iconLeft]" *ngIf="iconLeft"></ng-content>
    </lib-base-button>
  `
})
export class GhostButtonComponent {
  @Input() label: string = 'Ghost';
  @Input() variant: ButtonVariant = 'ghost';
  @Input() size: ButtonSize = 'md';
  @Input() rounded: 'md' | 'lg' | 'full' = 'full';
  @Input() state: ButtonState = 'idle';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() iconRight = false;
  @Input() iconLeft = false;
  @Input() preventMultipleClicks = false;
  @Input() clickCooldownMs = 500;
  @Input() textColor?: string;
  @Input() backgroundColor?: string;

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  handleClick(event: MouseEvent): void {
    this.buttonClick.emit(event);
  }
}
