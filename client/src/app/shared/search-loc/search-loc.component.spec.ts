import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLocComponent } from './search-loc.component';

describe('SearchLocComponent', () => {
  let component: SearchLocComponent;
  let fixture: ComponentFixture<SearchLocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchLocComponent]
    });
    fixture = TestBed.createComponent(SearchLocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
