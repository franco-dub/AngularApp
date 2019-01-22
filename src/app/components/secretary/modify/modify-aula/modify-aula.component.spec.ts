import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyAulaComponent } from './modify-aula.component';

describe('ModifyAulaComponent', () => {
  let component: ModifyAulaComponent;
  let fixture: ComponentFixture<ModifyAulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyAulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyAulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
