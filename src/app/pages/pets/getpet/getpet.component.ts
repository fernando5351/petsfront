import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PetComponent } from '../../../components/pet/pet.component';

@Component({
  selector: 'app-getpet',
  standalone: true,
  imports: [ReactiveFormsModule, PetComponent],
  templateUrl: './getpet.component.html',
  styleUrl: './getpet.component.scss'
})
export class GetpetComponent implements OnInit {
  ngOnInit(): void {

  }

}
