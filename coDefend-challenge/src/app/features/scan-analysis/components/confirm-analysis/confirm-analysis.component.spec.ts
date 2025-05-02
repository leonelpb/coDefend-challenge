import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAnalysisComponent } from './confirm-analysis.component';

describe('ConfirmAnalysisComponent', () => {
  let component: ConfirmAnalysisComponent;
  let fixture: ComponentFixture<ConfirmAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
