import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fadeInOutAnimation } from './createpet.animations';

@Component({
  selector: 'app-createpet',
  standalone: true,
  animations: [fadeInOutAnimation],
  imports: [NgClass, NgIf],
  templateUrl: './createpet.component.html',
  styleUrl: './createpet.component.scss'
})
export class CreatepetComponent implements OnInit {

  activeLink: string = '';
  imageUrl: string | ArrayBuffer = 'https://res.cloudinary.com/dtbs1ycrd/image/upload/v1714080910/img_qn2ocb.png';

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
    console.log(event);

    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  onSubmit() {

  }
}
