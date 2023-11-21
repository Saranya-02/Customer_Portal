import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquirydataComponent } from './inquirydata.component';

describe('InquirydataComponent', () => {
  let component: InquirydataComponent;
  let fixture: ComponentFixture<InquirydataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InquirydataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InquirydataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
