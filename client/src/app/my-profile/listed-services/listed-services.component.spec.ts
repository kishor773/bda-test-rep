import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedServicesComponent } from './listed-services.component';

describe('ListedServicesComponent', () => {
  let component: ListedServicesComponent;
  let fixture: ComponentFixture<ListedServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListedServicesComponent]
    });
    fixture = TestBed.createComponent(ListedServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
