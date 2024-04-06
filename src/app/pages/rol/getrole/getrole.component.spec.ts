import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetroleComponent } from './getrole.component';

describe('GetroleComponent', () => {
  let component: GetroleComponent;
  let fixture: ComponentFixture<GetroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetroleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
