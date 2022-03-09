import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-boat-info',
  templateUrl: './boat-info.component.html',
  styleUrls: ['./boat-info.component.scss']
})
export class BoatInfoComponent implements OnInit {

  boat_name: any;
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.boat_name = params.boat_name;
      window.scroll(0, 0)
    });

    if (this.boat_name === null) {
      this.boat_name = 'Default Vessel'
    }
  }

}
