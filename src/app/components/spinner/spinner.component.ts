import { Component, OnInit } from '@angular/core';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  loading: boolean = false;

  constructor(private loadingService: TransferService) {


  }
  ngOnInit(): void {
    this.loadingService.loadingSpinner.subscribe((option: any) => {

      this.loading = option;
    });
  }

}
