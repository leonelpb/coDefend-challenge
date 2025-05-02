import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputScannerComponent } from './input-scanner.component';

describe('InputScannerComponent', () => {
  let component: InputScannerComponent;
  let fixture: ComponentFixture<InputScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputScannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
