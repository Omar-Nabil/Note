import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuName: string = "login";

  constructor(private _Router:Router) {


    this._Router.events.subscribe({
      next: (response) => {
        if(response instanceof NavigationEnd) {
          this.menuName = response.url.replace('/', '');
        }
      }
    })
  }
}
