import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleFacade } from '@article/article.facade';
import { CreateArticleComponent } from '@article/components/create-article/create-article.component';
import { BackendErrors } from '@core/models/backend-errors.model';
import { Observable, of } from 'rxjs';

class MockArticleFacade {
  getIsSubmitting$(): Observable<boolean> {
    return of();
  }

  getValidationErrors$(): Observable<BackendErrors | null> {
    return of();
  }
}

describe('CreateArticleComponent', () => {
  let component: CreateArticleComponent;
  let fixture: ComponentFixture<CreateArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateArticleComponent],
      providers: [
        {
          provide: ArticleFacade,
          useClass: MockArticleFacade,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
