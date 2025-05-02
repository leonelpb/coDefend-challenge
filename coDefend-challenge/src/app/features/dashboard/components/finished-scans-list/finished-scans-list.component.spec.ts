import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedScansListComponent } from './finished-scans-list.component';

describe('FinishedScansListComponent', () => {
  let component: FinishedScansListComponent;
  let fixture: ComponentFixture<FinishedScansListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishedScansListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedScansListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
