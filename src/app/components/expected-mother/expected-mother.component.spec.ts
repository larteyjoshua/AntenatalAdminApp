import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpectedMotherComponent } from './expected-mother.component';

describe('ExpectedMotherComponent', () => {
  let component: ExpectedMotherComponent;
  let fixture: ComponentFixture<ExpectedMotherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpectedMotherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpectedMotherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
