import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { PopularTagsComponent } from './popular-tags.component';
import { PopularTagsFacade } from '../../popular-tags.facade';
import { MatCardModule } from '@angular/material/card';

class MockPopularTagsFacade {
  getPopularTags$(): Observable<Array<string> | null> {
    return of();
  }

  getIsLoading$(): Observable<boolean> {
    return of();
  }

  getError$(): Observable<string | null> {
    return of();
  }
}

describe('PopularTagsComponent', () => {
  let component: PopularTagsComponent;
  let fixture: ComponentFixture<PopularTagsComponent>;
  let initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopularTagsComponent],
      imports: [HttpClientTestingModule, MatCardModule],
      providers: [provideMockStore({ initialState }), { provide: PopularTagsFacade, useClass: MockPopularTagsFacade }],
    }).compileComponents();

    fixture = TestBed.createComponent(PopularTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
