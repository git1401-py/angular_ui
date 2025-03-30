import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularUiLibComponent } from './angular-ui-lib.component';

describe('AngularUiLibComponent', () => {
  let component: AngularUiLibComponent;
  let fixture: ComponentFixture<AngularUiLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularUiLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularUiLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
