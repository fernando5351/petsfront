import { Component } from '@angular/core';
import { LoadingService } from '../../service/loading/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  isLoading: boolean = false;

  constructor(
    private loadingService: LoadingService
    ) { }

  ngOnInit(): void {
    this.loadingService.isLoading$().subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }
}
