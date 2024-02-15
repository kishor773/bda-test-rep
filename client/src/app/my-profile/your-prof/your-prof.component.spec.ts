import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourProfComponent } from './your-prof.component';

describe('YourProfComponent', () => {
  let component: YourProfComponent;
  let fixture: ComponentFixture<YourProfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourProfComponent]
    });
    fixture = TestBed.createComponent(YourProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
