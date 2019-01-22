import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetSecretaryComponent } from './bottom-sheet-secretary.component';

describe('BottomSheetSecretaryComponent', () => {
  let component: BottomSheetSecretaryComponent;
  let fixture: ComponentFixture<BottomSheetSecretaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomSheetSecretaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSheetSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
