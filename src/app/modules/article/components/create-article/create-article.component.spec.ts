import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ArticleFacade } from '@article/article.facade';
import { CreateArticleComponent } from '@article/components/create-article/create-article.component';
import { ArticleForm } from '@article/models/article-form.model';
import { BackendErrors } from '@core/models/backend-errors.model';
import { FormPanelHeaderComponent } from '@shared/components/form-panel/components/auth-panel-header/form-panel-header.component';
import { FormPanelContentComponent } from '@shared/components/form-panel/components/form-panel-content/form-panel-content.component';
import { FormPanelComponent } from '@shared/components/form-panel/form-panel.component';
import { Observable, of } from 'rxjs';

class MockArticleFacade {
  getIsSubmitting$(): Observable<boolean> {
    return of();
  }

  getValidationErrors$(): Observable<BackendErrors | null> {
    return of();
  }

  getArticleForm$(): Observable<FormGroup<ArticleForm>> {
    return of();
  }
}

describe('CreateArticleComponent', () => {
  let component: CreateArticleComponent;
  let fixture: ComponentFixture<CreateArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateArticleComponent, FormPanelComponent, FormPanelHeaderComponent, FormPanelContentComponent],
      imports: [MatFormFieldModule, MatCardModule],
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
