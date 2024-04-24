import { Component } from '@angular/core';
import { PetComponent } from '../../../components/pet/pet.component';

@Component({
  selector: 'app-getpet',
  standalone: true,
  imports: [PetComponent],
  templateUrl: './getpet.component.html',
  styleUrl: './getpet.component.scss'
})
export class GetpetComponent {

}
