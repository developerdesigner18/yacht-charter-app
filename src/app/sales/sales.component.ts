import { Component, OnInit } from '@angular/core';
import { SalesService } from './sales.service';
import * as Notiflix from 'notiflix';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  BASE_URI: string;
  boatInfoAll: any;
  boatInfoDivided: any = [];

  constructor(
    private salesService: SalesService
  ) {
    this.BASE_URI = environment.apiUrl;
  }

  ngOnInit(): void {
    this.salesService.getBoatInfoAll().subscribe(
      res => {
        this.boatInfoAll = res.data
        
        const chunkSize = 3;
        for (let i = 0; i < this.boatInfoAll.length; i += chunkSize) {
            const chunk = this.boatInfoAll.slice(i, i + chunkSize);
            this.boatInfoDivided.push(chunk)
        }

        console.log('####sales', this.boatInfoAll);
        console.log('####sales-divided', this.boatInfoDivided);

        if (!res.success) { Notiflix.Notify.failure(res.error); }
      },
      err => {        
        Notiflix.Notify.failure(err.error.message);
      }
    );
  }

}
