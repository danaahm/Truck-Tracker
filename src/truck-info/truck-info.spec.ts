import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckInfo } from './truck-info';

describe('TruckInfo', () => {
  let component: TruckInfo;
  let fixture: ComponentFixture<TruckInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TruckInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruckInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
