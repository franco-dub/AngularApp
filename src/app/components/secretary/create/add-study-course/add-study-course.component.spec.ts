import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudyCourseComponent } from './add-study-course.component';

describe('AddStudyCourseComponent', () => {
  let component: AddStudyCourseComponent;
  let fixture: ComponentFixture<AddStudyCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudyCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudyCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
