import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MshErrorComponent } from './msh-error.component';

describe('MshErrorComponent', () => {
  let component: MshErrorComponent;
  let fixture: ComponentFixture<MshErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MshErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MshErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
