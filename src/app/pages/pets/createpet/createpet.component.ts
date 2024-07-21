import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { fadeInOutAnimation } from './createpet.animations';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

interface Animal {
  [key: string]: string | number | any;
}

@Component({
  selector: 'app-createpet',
  standalone: true,
  animations: [fadeInOutAnimation],
  imports: [NgClass, NgIf, NgFor, FormsModule, NgSelectModule],
  templateUrl: './createpet.component.html',
  styleUrl: './createpet.component.scss'
})
export class CreatepetComponent implements OnInit {

  activeLink: string = '';
  imageUrl: string = 'https://res.cloudinary.com/dtbs1ycrd/image/upload/v1714080910/img_qn2ocb.png';
  types: Animal[] = [
    { name: 'Perro', specieId: 1 },
    { name: 'Gato', specieId: 2 },
    { name: 'Pájaro', specieId: 3 },
  ];

  sex: Animal[] = [
    { name: 'Macho', sexId: 1 },
    { name: 'Hembra', sexId: 2 },
  ];

  vaccine: Animal[] = [
    { name: 'Si', value: true },
    { name: 'No', value: false },
    { name: 'No sé', value: false },
  ];

  sterile: Animal[] = [
    { name: 'Si', value: true },
    { name: 'No', value: false },
  ];

  behavior: Animal[] = [
    { name: 'Calmado', value: true },
    { name: 'Social', value: false },
    { name: 'Agresivo', value: false },
    { name: 'No Social', value: false },
  ];

  status: Animal[] = [
    { name: 'Saludable', value: true },
    { name: 'Enfermo', value: false },
    { name: 'En Peligro', value: false },
    { name: 'Maltratado', value: false },
  ];

  owner: Animal[] = [
    { name: 'Si', value: true },
    { name: 'No', value: false },
  ]

  selectedTypes: { [key: string]: Animal | null } = {
    type: null,
    sex: null,
    vaccine: null,
  };

  departments = [
    { name: 'Aguascalientes', id: 1 },
    { name: 'Baja California', id: 2 },
    { name: 'Baja California Sur', id: 3 },
    { name: 'Campeche', id: 4 },
  ]

  cities = [
    {id: 1, name: 'Vilnius'},
    {id: 2, name: 'Kaunas'},
    {id: 3, name: 'Pavilnys', disabled: true},
    {id: 4, name: 'Pabradė'},
    {id: 5, name: 'Klaipėda'}
];
selectedCity: any;

  selectedValue: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const fragment = this.route.snapshot.fragment;

          if (fragment) {
            this.setActiveLink(`#${fragment}`);
          }
        }
      });
  }

  ngOnInit(): void {
    const targetElement = document.getElementById('mascota');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    this.setActiveLink('#mascota');
    this.isActive('#mascota');
  }

  isActive(link: string) {
    return this.activeLink === link;
  }

  setActiveLink(link: string) {
    this.activeLink = link;
  }

  onFileSelected(event: any) {

    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  selectOption(variable: string, value: Animal, key: string): void {
    this.selectedTypes[key] = value[variable];
  }

  isSelected(category: string, type: Animal): boolean {
    return this.selectedTypes[category] === type['name'];
  }

  keyup(event: any, key: string) {
    this.selectedTypes[key] = event.target.value;
  }

  inputValue(key: string) {
    let value = this.selectedTypes[key];
    if (value) {
      return value;
    }
    return '';
  }

  onSubmit() {

  }
}
