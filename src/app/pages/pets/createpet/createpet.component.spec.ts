import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepetComponent } from './createpet.component';

describe('CreatepetComponent', () => {
  let component: CreatepetComponent;
  let fixture: ComponentFixture<CreatepetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatepetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatepetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
