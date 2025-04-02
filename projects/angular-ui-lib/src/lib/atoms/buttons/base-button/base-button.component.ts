import {Component, Input, Output, EventEmitter, HostListener, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

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
export class BaseButtonComponent implements OnInit  {
  colors: any;
  @Input() label: string = 'primary';
  @Input() textColor?: string;
  @Input() backgroundColor?: string ;
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

  constructor(private themeService: ThemeService) {}
  ngOnInit(): void {

    // اشتراک به Observable برای دسترسی به تم‌ها و رنگ‌ها
    this.themeService.currentThemeColors$.subscribe((colors) => {
      this.colors = colors;
    });
  }

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
  res_obj :{} =  {}
  get buttonStyles() {
    const colors = this.colors;
    this.res_obj =  {
      'color': colors[this.variant],
      'background-color': colors[`${this.variant}-foreground`],
      'border-color': colors['border'] ,
      'box-shadow': `0 2px 4px ${colors['ring'] }`,
    };
    if (this.backgroundColor) {
      this.res_obj = {...this.res_obj,'background-color':this.backgroundColor};
    }
    if (this.textColor) {
      this.res_obj = {...this.res_obj,'color':this.textColor};
    }
    // console.log(this.backgroundColor)
    // console.log(this.textColor)
    return this.res_obj
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
    const stateClasses = {
      'loading': 'opacity-70 cursor-wait',
      'disabled': 'opacity-50 cursor-not-allowed',
      'idle': ''
    };

    // return `${baseClasses} ${sizeClasses[this.size]} ${variantClasses[this.variant]} ${stateClasses[this.state]}`;
    return `${baseClasses} ${sizeClasses[this.size]} ${stateClasses[this.state]}`;
  }

}
