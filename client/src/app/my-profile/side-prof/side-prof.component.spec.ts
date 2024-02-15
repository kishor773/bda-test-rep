import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideProfComponent } from './side-prof.component';

describe('SideProfComponent', () => {
  let component: SideProfComponent;
  let fixture: ComponentFixture<SideProfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideProfComponent]
    });
    fixture = TestBed.createComponent(SideProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
