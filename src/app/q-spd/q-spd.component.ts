import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-q-spd',
  templateUrl: './q-spd.component.html',
  styleUrls: ['./q-spd.component.scss']
})
export class QSpdComponent implements OnInit {
  BASE_URI: string;
  imageObject: Array<object>;
  qSpdInfo: any[];
  showFlag: boolean = false;
  currentIndex: any = -1;
  lightboxObject: any;
  
  constructor() {
    this.BASE_URI = environment.apiUrl;
  }

  ngOnInit(): void {
    
    this.qSpdInfo = [
      {
        name: 'https://www.q-spd.com/wp-content/uploads/IMG_2308-2-1024x768.jpg',
      },
      {
        name: 'https://www.q-spd.com/wp-content/uploads/QSD1-stb1-clr-1024x683.png',
      },
      {
        name: 'https://www.q-spd.com/wp-content/uploads/QSD1-thurst1-1024x683.jpg',
      },
      {
        name: 'https://www.q-spd.com/wp-content/uploads/IMG_2293-1024x1024.jpg',
      },
      {
        name: 'https://www.diesel-international.com/wp-content/uploads/2019/02/QSD1-e1551003206487.jpg',
      },
      {
        name: 'https://www.q-spd.com/wp-content/uploads/Royal-Denship-821.jpg',
      },
      {
        name: 'https://www.q-spd.com/wp-content/uploads/Q-SPD-MY400-Drive-system-on-Royal-Deanship-821-1024x588.jpg',
      },
    ]

    console.log('####qspd', this.qSpdInfo);
    
    this.imageObject = [
      {
        image: 'https://www.q-spd.com/wp-content/uploads/IMG_2308-2-1024x768.jpg',
        thumbImage: 'https://www.q-spd.com/wp-content/themes/Sterling/framework/extended/timthumb/timthumb.php?src=https://www.q-spd.com/wp-content/uploads/IMG_2308-2-e1494646855993.jpg&h=133&w=197',
        // order: 1 //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
      },
      {
        image: 'https://www.q-spd.com/wp-content/uploads/QSD1-stb1-clr-1024x683.png',
        thumbImage: 'https://www.q-spd.com/wp-content/uploads/QSD1-stb1-clr-1024x683.png',
      },
      {
        image: 'https://www.q-spd.com/wp-content/uploads/QSD1-thurst1-1024x683.jpg',
        thumbImage: 'https://www.q-spd.com/wp-content/uploads/QSD1-thurst1-1024x683.jpg',
      },
      {
        image: 'https://www.q-spd.com/wp-content/uploads/IMG_2293-1024x1024.jpg',
        thumbImage: 'https://www.q-spd.com/wp-content/uploads/IMG_2293-1024x1024.jpg',
      },
      {
        image: 'https://www.diesel-international.com/wp-content/uploads/2019/02/QSD1-e1551003206487.jpg',
        thumbImage: 'https://www.diesel-international.com/wp-content/uploads/2019/02/QSD1-e1551003206487.jpg',
      },
      {
        image: 'https://www.q-spd.com/wp-content/uploads/Royal-Denship-821.jpg',
        thumbImage: 'https://www.q-spd.com/wp-content/uploads/Royal-Denship-821.jpg',
      },
      {
        image: 'https://www.q-spd.com/wp-content/uploads/Q-SPD-MY400-Drive-system-on-Royal-Deanship-821-1024x588.jpg',
        thumbImage: 'https://www.q-spd.com/wp-content/uploads/Q-SPD-MY400-Drive-system-on-Royal-Deanship-821-1024x588.jpg',
      },
    ];
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
