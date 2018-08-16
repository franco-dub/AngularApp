import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegHomeComponent } from './seg-home.component';

describe('SegHomeComponent', () => {
  let component: SegHomeComponent;
  let fixture: ComponentFixture<SegHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
