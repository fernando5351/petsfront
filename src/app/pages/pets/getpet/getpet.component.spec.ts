import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetpetComponent } from './getpet.component';

describe('GetpetComponent', () => {
  let component: GetpetComponent;
  let fixture: ComponentFixture<GetpetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetpetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetpetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
