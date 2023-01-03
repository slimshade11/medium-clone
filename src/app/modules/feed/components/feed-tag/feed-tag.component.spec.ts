import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FeedTagComponent } from '@feed/components/feed-tag/feed-tag.component';

describe('FeedTagComponent', () => {
  let component: FeedTagComponent;
  let fixture: ComponentFixture<FeedTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedTagComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
