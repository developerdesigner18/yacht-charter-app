import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  show_menu: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {        
        event.url.split('/')[1] == 'admin' ? this.show_menu = false : this.show_menu = true
      }
    });
  }

  redirectHome() {    
    if (this.show_menu === true) this.router.navigateByUrl('/')
    if (this.show_menu === false) this.router.navigateByUrl('/admin/admin-dashboard')
  }

}
