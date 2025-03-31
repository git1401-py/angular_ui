import { Component, Input, Output, EventEmitter, ElementRef, HostBinding, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'link';//| 'warning'
export type ButtonState = 'idle' | 'loading' | 'disabled';

@Component({
  selector: 'lib-base-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-button.component.html',
  styleUrls: ['./base-button.component.scss'],
})
export class BaseButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() state: ButtonState = 'idle';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() iconRight = false;
  @Input() preventMultipleClicks = false;
  @Input() clickCooldownMs = 500; // Time to prevent consecutive clicks

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  private isClickCooldown = false;

  constructor(private el: ElementRef) {}

  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent): void {
    if (this.disabled || this.state === 'disabled' || this.state === 'loading' ||
      (this.preventMultipleClicks && this.isClickCooldown)) {
      event.preventDefault();
      event.stopPropagation();
      return
    }

    if (this.preventMultipleClicks) {
      this.isClickCooldown = true;
      setTimeout(() => {
        this.isClickCooldown = false;
      }, this.clickCooldownMs)
    }

    try {
      this.buttonClick.emit(event);
    }catch (error){
      console.error('Error in button click handler: ',error);
    }
  }


  getButtonClasses(): string {
    const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const sizeClasses = {
      'xs': 'h-8 px-2 text-xs',
      'sm': 'h-9 px-3',
      'md': 'h-10 py-2 px-4',
      'lg': 'h-11 px-8',
      'xl': 'h-12 px-10 text-lg'
    };

    const variantClasses = {
      'primary': 'bg-primary text-primary-foreground hover:bg-primary/90',
      'secondary': 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      'outline': 'border border-input hover:bg-accent hover:text-accent-foreground',
      'ghost': 'hover:bg-accent hover:text-accent-foreground',
      'danger': 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      'success': 'bg-success text-success-foreground hover:bg-success/90',
      'link': 'underline-offset-4 hover:underline text-primary',
    };

    const stateClasses = {
      'loading': 'opacity-70 cursor-wait',
      'disabled': 'opacity-50 cursor-not-allowed',
      'idle': ''
    };

    return `${baseClasses} ${sizeClasses[this.size]} ${variantClasses[this.variant]} ${stateClasses[this.state]}`;
  }

}
