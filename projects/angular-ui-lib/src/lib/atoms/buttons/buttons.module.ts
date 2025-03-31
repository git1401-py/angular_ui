import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseButtonComponent } from './base-button/base-button.component';
import { PrimaryButtonComponent } from './primary-button/primary-button.component';
// Import other button components here...

@NgModule({
  imports: [
    CommonModule,
    BaseButtonComponent,
    PrimaryButtonComponent,
    // Add other button components here...
  ],
  exports: [
    BaseButtonComponent,
    PrimaryButtonComponent,
    // Export other button components here...
  ]
})
export class ButtonsModule { }

// آماده‌سازی صادرات عمومی
export * from './base-button/base-button.component';
export * from './primary-button/primary-button.component';
// Export other button components here...
