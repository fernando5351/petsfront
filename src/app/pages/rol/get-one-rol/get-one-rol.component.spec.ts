import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetOneRolComponent } from './get-one-rol.component';

describe('GetOneRolComponent', () => {
  let component: GetOneRolComponent;
  let fixture: ComponentFixture<GetOneRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetOneRolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetOneRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
