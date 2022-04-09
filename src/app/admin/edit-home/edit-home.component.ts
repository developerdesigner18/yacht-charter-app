import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home/home.service';
import * as Notiflix from 'notiflix';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-edit-home',
  templateUrl: './edit-home.component.html',
  styleUrls: ['./edit-home.component.scss']
})
export class EditHomeComponent implements OnInit {
  BASE_URI: string;
  homeData: any;

  constructor(
    private homeService: HomeService,
  ) {
    this.BASE_URI = environment.apiUrl;
  }

  ngOnInit(): void {
    this.homeService.getHomeData().subscribe(
      res => {
        this.homeData = res.data
        console.log('###edit-home', this.homeData);
        
        if (!res.success) { Notiflix.Notify.failure(res.error); }
      },
      err => {        
        Notiflix.Notify.failure(err.error.message);
      }
    );
  }

}
