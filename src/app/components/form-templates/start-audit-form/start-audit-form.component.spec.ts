import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartAuditFormComponent } from './start-audit-form.component';

describe('StartAuditFormComponent', () => {
  let component: StartAuditFormComponent;
  let fixture: ComponentFixture<StartAuditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartAuditFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartAuditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
