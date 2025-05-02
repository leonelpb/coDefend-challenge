import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetStatCardComponent } from './asset-stat-card.component';

describe('AssetStatCardComponent', () => {
  let component: AssetStatCardComponent;
  let fixture: ComponentFixture<AssetStatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetStatCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetStatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
