import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCourseComponent } from './modify-course.component';

describe('ModifyCourseComponent', () => {
  let component: ModifyCourseComponent;
  let fixture: ComponentFixture<ModifyCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
