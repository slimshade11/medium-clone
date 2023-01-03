import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { ContainerComponent } from '@app/modules/shared/components/container/container.component';
import { ArticleFacade } from '@article/article.facade';
import { ArticleComponent } from '@article/components/article/article.component';
import { Article } from '@feed/models/article.model';
import { MockBuilder } from 'ng-mocks';
import { Observable, of } from 'rxjs';

class MockArticleFacade {
  getIsLoading$(): Observable<boolean> {
    return of();
  }

  getError$(): Observable<string | null> {
    return of();
  }

  getIsAuthor$(): Observable<boolean> {
    return of();
  }

  getArticle$(): Observable<Article | null> {
    return of();
  }

  dispatchGetArticle(): void {}
}

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(() => MockBuilder(ContainerComponent));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleComponent],
      imports: [MatDialogModule, RouterTestingModule, MatCardModule],
      providers: [
        {
          provide: ArticleFacade,
          useClass: MockArticleFacade,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
