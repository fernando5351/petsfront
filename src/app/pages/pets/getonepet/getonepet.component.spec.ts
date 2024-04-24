import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetOnePetComponent } from './getonepet.component';

describe('GetonepetComponent', () => {
  let component: GetOnePetComponent;
  let fixture: ComponentFixture<GetOnePetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetOnePetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetOnePetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
