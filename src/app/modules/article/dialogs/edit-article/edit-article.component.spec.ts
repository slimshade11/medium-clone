import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ArticleFacade } from '@article/article.facade';
import { EditArticleComponent } from '@article/dialogs/edit-article/edit-article.component';
import { ArticleForm } from '@article/models/article-form.model';
import { BackendErrors } from '@core/models/backend-errors.model';
import { Observable, of } from 'rxjs';

class MockArticleFacade {
  getIsSubmittingArticleEdit$(): Observable<boolean> {
    return of();
  }

  getValidationErrorsArticleEdit$(): Observable<BackendErrors | null> {
    return of();
  }

  getArticleForm$(): Observable<FormGroup<ArticleForm>> {
    return of();
  }
}

describe('EditArticleComponent', () => {
  let component: EditArticleComponent;
  let fixture: ComponentFixture<EditArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditArticleComponent],
      imports: [MatIconModule, MatFormFieldModule, ReactiveFormsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: ArticleFacade, useClass: MockArticleFacade },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
