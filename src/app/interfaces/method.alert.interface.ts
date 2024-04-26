type DeleteMethod<T> = (id: number) => import('rxjs').Observable<T>;

export interface ServiceMethodInterface<T> {
  deleteMethod: DeleteMethod<T>;
}
