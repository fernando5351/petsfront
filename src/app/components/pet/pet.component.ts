import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './pet.component.html',
  styleUrl: './pet.component.scss'
})
export class PetComponent {
  img: string = 'https://delangelclinicaveterinaria.com/wp-content/uploads/2021/06/perros.png';

  constructor(
    private router: Router,
  ){}
}
