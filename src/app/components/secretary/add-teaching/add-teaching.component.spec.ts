import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeachingComponent } from './add-teaching.component';

describe('AddTeachingComponent', () => {
  let component: AddTeachingComponent;
  let fixture: ComponentFixture<AddTeachingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTeachingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeachingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
