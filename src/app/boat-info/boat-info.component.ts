import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoatInfoService } from './boat-info.service';
import * as Notiflix from 'notiflix';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-boat-info',
  templateUrl: './boat-info.component.html',
  styleUrls: ['./boat-info.component.scss']
})
export class BoatInfoComponent implements OnInit {
  BASE_URI: string;
  boatInfoData: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private boatInfoService: BoatInfoService,
    ) {
      this.BASE_URI = environment.apiUrl;
    }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      var bid = params.bid;
      if (bid === null || bid === undefined) {
        Notiflix.Notify.failure('This Boat is currently not available.');
        this.location.back()
      } else {
        this.boatInfoService.getBoatInfoById(bid).subscribe(
          res => {
            this.boatInfoData = res.data
            console.log('###', this.boatInfoData);
            
            if (!res.success) { Notiflix.Notify.failure(res.error); }
          },
          err => {        
            Notiflix.Notify.failure(err.error.message);
          }
        );
      }
    });
  }

}
