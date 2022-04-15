import { Component, OnInit } from '@angular/core';
import { SalesService } from './sales.service';
import * as Notiflix from 'notiflix';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  BASE_URI: string;
  boatInfoAll: any = [];
  boatInfoDivided: any = [];
  filters: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private salesService: SalesService
  ) {
    this.BASE_URI = environment.apiUrl;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      var btype = params.btype;
      if (btype === null || btype === undefined) {
        this.filters = false;
        this.salesService.getActiveBoatInfoAll().subscribe(
          res => {
            this.boatInfoAll = res.data
            const chunkSize = 3;
            for (let i = 0; i < this.boatInfoAll.length; i += chunkSize) {
                const chunk = this.boatInfoAll.slice(i, i + chunkSize);
                this.boatInfoDivided.push(chunk)
            }
    
            console.log('####sales', this.boatInfoAll);
            console.log('####sales-divided', this.boatInfoDivided);
            if (!res.body.success) { Notiflix.Notify.failure(res.body.message); }
          },
          err => {        
            // Notiflix.Notify.failure(err.error.message);
          }
        );
      } else {
        this.filters = true;
        this.salesService.getBoatInfoAllByType(btype).subscribe(
          res => {
            this.boatInfoAll = res.data
            const chunkSize = 3;
            for (let i = 0; i < this.boatInfoAll.length; i += chunkSize) {
                const chunk = this.boatInfoAll.slice(i, i + chunkSize);
                this.boatInfoDivided.push(chunk)
            }
    
            console.log('####sales_by_type', this.boatInfoAll);
            console.log('####sales_by_type-divided', this.boatInfoDivided);
            if (!res.body.success) { Notiflix.Notify.failure(res.body.message); }
          },
          err => {
            this.boatInfoAll = [];
            this.boatInfoDivided = [];
            // Notiflix.Notify.failure(err.message);
          }
        );
      }
    });
  }

}
