import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

import { PrimaryButtonComponent } from '../../projects/angular-ui-lib/src/lib/atoms/buttons/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../projects/angular-ui-lib/src/lib/atoms/buttons/secondary-button/secondary-button.component';
import { LinkButtonComponent } from '../../projects/angular-ui-lib/src/lib/atoms/buttons/link-button/link-button.component';
import { OutlineButtonComponent } from '../../projects/angular-ui-lib/src/lib/atoms/buttons/outline-button/outline-button.component';
import { GhostButtonComponent } from '../../projects/angular-ui-lib/src/lib/atoms/buttons/ghost-button/ghost-button.component';
import { DangerButtonComponent } from '../../projects/angular-ui-lib/src/lib/atoms/buttons/danger-button/danger-button.component';
import { SuccessButtonComponent } from '../../projects/angular-ui-lib/src/lib/atoms/buttons/success-button/success-button.component';
@Component({
  selector: 'app-root',
  standalone:true,
  imports: [PrimaryButtonComponent,SecondaryButtonComponent,LinkButtonComponent,OutlineButtonComponent,GhostButtonComponent,DangerButtonComponent,SuccessButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-ui';
}
