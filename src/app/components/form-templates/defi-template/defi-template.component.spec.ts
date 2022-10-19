import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefiTemplateComponent } from './defi-template.component';

describe('DefiTemplateComponent', () => {
  let component: DefiTemplateComponent;
  let fixture: ComponentFixture<DefiTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefiTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefiTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
