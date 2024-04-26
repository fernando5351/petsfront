type DeleteMethod<T> = (id: number) => import('rxjs').Observable<T>;
import Swal, { SweetAlertPosition } from 'sweetalert2';

export interface ServiceMethodInterface<T> {
  deleteMethod: DeleteMethod<T>;
}

export interface AlertPositionInterface {
  position: 'top-start'| 'top' | 'top-end' | 'top-left' | 'top-right' | 'center' |
  'bottom-start' | 'bottom' | 'bottom-end' | 'bottom-left' | 'bottom-right' | 'center-left'
  | 'center-right' | 'center-start'| 'center-end';
}

// Define un objeto que mapea los valores de AlertPositionInterface a SweetAlertPosition
export const positionMap: { [key in AlertPositionInterface['position']]: SweetAlertPosition } = {
  'top-start': 'top-start',
  'top': 'top',
  'top-end': 'top-end',
  'top-left': 'top-left',
  'top-right': 'top-right',
  'center': 'center',
  'bottom-start': 'bottom-start',
  'bottom': 'bottom',
  'bottom-end': 'bottom-end',
  'bottom-left': 'bottom-left',
  'bottom-right': 'bottom-right',
  'center-left': 'center-left',
  'center-right': 'center-right',
  'center-start': 'center-start',
  'center-end': 'center-end',
};
