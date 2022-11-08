import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemissueComponent } from './itemissue.component';

describe('ItemissueComponent', () => {
  let component: ItemissueComponent;
  let fixture: ComponentFixture<ItemissueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemissueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemissueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
