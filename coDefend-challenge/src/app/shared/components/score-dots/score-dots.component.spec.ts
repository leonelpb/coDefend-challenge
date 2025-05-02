import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreDotsComponent } from './score-dots.component';

describe('ScoreDotsComponent', () => {
  let component: ScoreDotsComponent;
  let fixture: ComponentFixture<ScoreDotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreDotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreDotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
