import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesOverviewListComponent } from './issues-overview-list.component';

describe('IssuesOverviewListComponent', () => {
  let component: IssuesOverviewListComponent;
  let fixture: ComponentFixture<IssuesOverviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuesOverviewListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuesOverviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
