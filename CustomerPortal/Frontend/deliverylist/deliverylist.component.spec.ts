import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverylistComponent } from './deliverylist.component';

describe('DeliverylistComponent', () => {
  let component: DeliverylistComponent;
  let fixture: ComponentFixture<DeliverylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliverylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
