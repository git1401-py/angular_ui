import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

import { PrimaryButtonComponent } from '../../projects/angular-ui-lib/src/lib/atoms/buttons/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../projects/angular-ui-lib/src/lib/atoms/buttons/secondary-button/secondary-button.component';
@Component({
  selector: 'app-root',
  standalone:true,
  imports: [PrimaryButtonComponent,SecondaryButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-ui';
}
