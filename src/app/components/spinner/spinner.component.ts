import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  spinnerVisibility$ = this.spinnerService.spinnerVisibility$;

  constructor(private spinnerService: SpinnerService) { }
}