import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPanelContentComponent } from './auth-panel-content.component';

describe('AuthPanelContentComponent', () => {
  let component: AuthPanelContentComponent;
  let fixture: ComponentFixture<AuthPanelContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthPanelContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPanelContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
