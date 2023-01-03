import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TopBarComponent } from '@shared/components/top-bar/top-bar.component';
import { AppComponent } from 'src/app/app.component';

describe('AppComponent', () => {
  let initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatDialogModule, BrowserAnimationsModule],
      declarations: [AppComponent, TopBarComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
