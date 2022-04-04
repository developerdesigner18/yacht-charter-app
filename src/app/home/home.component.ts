import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TimelineLite, Back, Power1 } from 'gsap';
import SlowMo from "gsap"
import { HomeService } from './home.service';
import * as Notiflix from 'notiflix';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('box1') box: ElementRef | undefined
  @ViewChildren('btn') btnContainers: QueryList<ElementRef> | undefined
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
        console.log('###', this.homeData);
        
        if (!res.success) { Notiflix.Notify.failure(res.error); }
      },
      err => {        
        Notiflix.Notify.failure(err.error.message);
      }
    );
  }

  something () {
    const tl: TimelineLite = new TimelineLite()
  }
  

}
