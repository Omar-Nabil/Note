import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _HttpClient:HttpClient, private _Router:Router) {
    this.userData();
  }

  register(formData:object):Observable<any> {
    return this._HttpClient.post(environment.baseUrl+'signup', formData);
  }
  login(formData:object):Observable<any> {
    return this._HttpClient.post(environment.baseUrl+'signin', formData);
  }

  userData():void {
    const token = localStorage.getItem('userToken');

    if(token) {
      const userData = jwtDecode(token);
      this.user.next(userData);
      this._Router.navigate(['/home']);
    }
  }
}
