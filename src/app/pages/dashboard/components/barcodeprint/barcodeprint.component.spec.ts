import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Routes, RouterModule } from '@angular/router';

import { barcodeprintcomponent } from './barcodeprint.component';

describe('barcodeprintcomponent', () => {
  let component: barcodeprintcomponent;
  let fixture: ComponentFixture<barcodeprintcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ barcodeprintcomponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(barcodeprintcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
