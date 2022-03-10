import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router, private route: ActivatedRoute, private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    // Modification of the title
    this.title.setTitle('Angular Boat Brokerage and Sales Web App - The easiest way to charter a boat');
  
    // Modification of the metas
    this.meta.addTag({
        name: 'description',
        content: 'The best way to get a charter or buy a boat from a web site with great user experience'
    })

    this.router.events.subscribe((val) => {
      // see also 
      window.scroll(0, 0)
  });

  }
}
