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
  boatImagesAll: any;
  boatImagesDivided: any;
  showFlag: boolean = false;
  currentIndex: any = -1;
  lightboxObject: any;

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
            console.log('###boat-info', this.boatInfoData);
            
            this.boatImagesAll = this.boatInfoData?.boat_images
            
            this.boatImagesDivided = []
            const chunkSize = 4;
            for (let i = 0; i < this.boatInfoData?.boat_images.length; i += chunkSize) {
              let chunk = this.boatInfoData?.boat_images.slice(i, i + chunkSize);
              this.boatImagesDivided.push(chunk)
            }

            this.lightboxObject = this.boatImagesAll.map((item: { _id: any; name: any; }) => {
              return {
                image: this.BASE_URI + item.name,
                _id: item._id
              };
            });
            console.log('*&*&*&', this.lightboxObject)

            
            if (!res.success) { Notiflix.Notify.failure(res.error); }
          },
          err => {        
            Notiflix.Notify.failure(err.error.message);
          }
        );
      }
    });
  }

  showLightbox(img: any) {
    this.lightboxObject.map((item: any, index: any) => {
      if (img._id == item._id) {
        this.currentIndex = index;
      }
    })
    this.showFlag = true;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }

}
