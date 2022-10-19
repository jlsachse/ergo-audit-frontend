import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DappTableComponent } from './dapp-table.component';

describe('DappTableComponent', () => {
  let component: DappTableComponent;
  let fixture: ComponentFixture<DappTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DappTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DappTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
