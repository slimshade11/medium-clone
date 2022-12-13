import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedTagComponent } from './feed-tag.component';

describe('FeedTagComponent', () => {
  let component: FeedTagComponent;
  let fixture: ComponentFixture<FeedTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedTagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
