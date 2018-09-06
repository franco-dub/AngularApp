import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyTeachingComponent } from './modify-teaching.component';

describe('ModifyTeachingComponent', () => {
  let component: ModifyTeachingComponent;
  let fixture: ComponentFixture<ModifyTeachingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyTeachingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyTeachingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
