import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullCommentComponent } from './full-comment.component';

describe('FullCommentComponent', () => {
  let component: FullCommentComponent;
  let fixture: ComponentFixture<FullCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullCommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
