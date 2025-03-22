import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfricaMapComponentComponent } from './africa-map-component.component';

describe('AfricaMapComponentComponent', () => {
  let component: AfricaMapComponentComponent;
  let fixture: ComponentFixture<AfricaMapComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfricaMapComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AfricaMapComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
