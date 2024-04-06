import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

  mails = [
    "¡Guau! No pude encontrar lo que buscabas.",
    "Wof wof... parece que esta página se ha perdido.",
    "Sniff sniff... ¿hueles eso? Creo que es un error 404.",
    "¡Guau!, ¡guau!, no se encontro el recurso que solicitaste"
  ];

  randomMail = this.mails[Math.floor(Math.random() * this.mails.length)];

}
