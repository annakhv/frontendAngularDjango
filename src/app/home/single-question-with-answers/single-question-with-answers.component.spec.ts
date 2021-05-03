import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleQuestionWithAnswersComponent } from './single-question-with-answers.component';

describe('SingleQuestionWithAnswersComponent', () => {
  let component: SingleQuestionWithAnswersComponent;
  let fixture: ComponentFixture<SingleQuestionWithAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleQuestionWithAnswersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleQuestionWithAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
