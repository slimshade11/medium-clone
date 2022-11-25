import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPanelHeaderComponent } from './auth-panel-header.component';

describe('AuthPanelHeaderComponent', () => {
  let component: AuthPanelHeaderComponent;
  let fixture: ComponentFixture<AuthPanelHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthPanelHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPanelHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
