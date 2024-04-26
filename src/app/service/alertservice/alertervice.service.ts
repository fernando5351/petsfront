import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SweetAlertPosition } from 'sweetalert2';
import { AlertPositionInterface, ServiceMethodInterface, positionMap } from '../../interfaces/method.alert.interface';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private router: Router
  ) {}

  errorAlert(title: string, message: string, position: AlertPositionInterface = { position: 'center' }, toast: boolean = false, timer: number = 3000): Promise<void> {
    const sweetAlertPosition: SweetAlertPosition = positionMap[position.position];

    return new Promise<void>((resolve) => {
      Swal.fire({
        icon: 'error',
        title,
        text: message,
        timer,
        toast,
        position: sweetAlertPosition
      }).then(() => resolve());
    });
  }

  sucessAlert(title: string, message: string, position: AlertPositionInterface = { position: 'center' }, toast: boolean = false, timer: number = 2000): Promise<void> {
    const sweetAlertPosition: SweetAlertPosition = positionMap[position.position];

    return new Promise<void>((resolve) => {
      Swal.fire({
        icon: 'success',
        title,
        text: message,
        timer,
        toast,
        position: sweetAlertPosition
      }).then(() => resolve());
    });
  }

  deleteAlert<T>(service: ServiceMethodInterface<T>, name: string, id: number, url: string): Promise<void> {
    return new Promise<void>((resolve) => {
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
              this.sucessAlert('¡Eliminado!', 'El registro ha sido eliminado').then(() => {
                this.router.navigate([url]);
                resolve();
              });
            },
            error: (error: any) => {
              this.errorAlert('Error', error.message).then(() => resolve());
            }
          });
        } else {
          this.errorAlert('Cancelado', 'Tu registro está a salvo').then(() => resolve());
        }
      });
    });
  }

// deleteAlert<T>(service: ServiceMethodInterface<T>, name: string, id: number, url: string) {
//   Swal.fire({
//     title: `¿Estás seguro de querer borrar el registro ${name}?`,
//     text: "¡No podrás revertir esto!",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#d33',
//     cancelButtonColor: '#353755',
//     confirmButtonText: '¡Sí, estoy seguro!'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       service.deleteMethod(id).subscribe({
//         next: (response: any) => {
//           this.sucessAlert('¡Eliminado!', 'El registro ha sido eliminado');
//           setTimeout(() => {
//             window.location.href = url;
//           }, 500);
//         },
//         error: (error: any) => {
//           this.errorAlert('Error', error.message)
//           return
//         }
//       });
//     } else {
//       this.errorAlert('Cancelado', 'Tu registro está a salvo');
//     }
//   });
// }

}
