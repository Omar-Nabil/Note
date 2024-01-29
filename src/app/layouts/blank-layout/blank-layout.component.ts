import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.css']
})
export class BlankLayoutComponent {
  constructor(private _Router:Router) {}
  logout() {
    this._Router.navigate(['/login']);
    localStorage.setItem('userToken', '');
  }
}
