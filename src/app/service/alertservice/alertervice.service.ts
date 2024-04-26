import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ServiceMethodInterface } from '../../interfaces/method.alert.interface';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private router: Router
  ) { }

  errorAlert(title: string, message: string, toast: boolean = false , timer: number = 3000) {
    Swal.fire({
      icon: 'error',
      title,
      text: message,
      timer,
      toast
    });
  }

  sucessAlert(title: string, message: string, toast: boolean = false , position: string, timer: number = 2000) {
    Swal.fire({
      icon: 'success',
      title,
      text: message,
      timer,
      toast,
    })
  }

deleteAlert<T>(service: ServiceMethodInterface<T>, name: string, id: number, urlSuccess: string) {
  Swal.fire({
    title: `¿Estás seguro de querer borrar el registro ${name}?`,
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#353755',
    confirmButtonText: '¡Sí, estoy seguro!'
  }).then((result) => {
    if (result.isConfirmed) {
      service.deleteMethod(id).subscribe({
        next: (response: any) => {
          Swal.fire(
            '¡Eliminado!',
            `El registro ha sido eliminado`,
            'success'
          ).then((result) => {
            if (result) {
              this.router.navigate([urlSuccess]);
            }
          });
          return
        },
        error: (error: any) => {
          Swal.fire(
            '¡Error!',
            `Error: ${error.message}`,
            'error'
          );
          return
        }
      });
    } else {
      Swal.fire({
        title: 'Cancelado',
        text: 'Tu registro está a salvo',
        icon: 'info'
      })
    }
  });
}

}
