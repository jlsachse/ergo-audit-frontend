import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditorTableComponent } from './auditor-table.component';

describe('AuditorTableComponent', () => {
  let component: AuditorTableComponent;
  let fixture: ComponentFixture<AuditorTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditorTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
