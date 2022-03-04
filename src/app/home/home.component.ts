import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TimelineLite, Back, Power1 } from 'gsap';
import SlowMo from "gsap"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('box1') box: ElementRef | undefined
  @ViewChildren('btn') btnContainers: QueryList<ElementRef> | undefined

  constructor() { }

  ngOnInit(): void {
  }

  something () {
    const tl: TimelineLite = new TimelineLite()
  }
  

}
