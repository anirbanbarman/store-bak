import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemreceiveComponent } from './itemreceive.component';

describe('ItemreceiveComponent', () => {
  let component: ItemreceiveComponent;
  let fixture: ComponentFixture<ItemreceiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemreceiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemreceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
