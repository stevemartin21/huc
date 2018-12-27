import { Injectable } from '@angular/core';

import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import {Church } from '../models/church.model';

@Injectable({
  providedIn: 'root'
})
export class CreateDataService {

  token: string;
  isAuthenticated = false;
  authStatus = new Subject<Boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getAuthStatus() {
    return this.authStatus.asObservable();
  }

  createUser(_id: null, name: string, email: string, password: string) {
    const newUser: User =  {
      _id: _id,
      name: name,
      email: email,
      password: password
    };

    this.http.post<{message: string, user: User}>('http://localhost:3000/create/user', newUser)
      .subscribe(response => {
        console.log(response);
      }, Error => {
        console.log(Error);
      });
  }

  createToken(email: string, password: string) {
    const newToken = {
      email: email,
      password: password
    };

    // tslint:disable-next-line:max-line-length
    this.http.post<{message: String, user: User, token: string, expiresIn: number, userId: string}>('http://localhost:3000/create/token', newToken)
      .subscribe(response => {
        console.log(response);
        const token = response.token;
        this.token = response.token;
        console.log(this.token);
        if (token) {
          this.isAuthenticated = true;
          this.authStatus.next(true);
          this.router.navigate(['/dashboard']);
          this.setLocalStorage(token, response.expiresIn);
        }

      }, Error => {
        console.log(Error);
      });

  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatus.next(false);
    this.clearLocalStorage();
    this.router.navigate(['/']);
  }

  //  set Local storrage

  setLocalStorage(token: string) {
    localStorage.setItem('token', token);
  }

  // Clear Local Storate

  clearLocalStorage() {
    localStorage.removeItem('token');
  }



  createChurch (title: string, year: string, denomination: string, city: string, county: string, history: string, image: file) {

    const postData = new FormData();
    postData.append('title', title);
    postData.append('history', history);
    postData.append('year', year);
    postData.append('denomination', denomination);
    postData.append('image', image, title);
    postData.append('city', city);
    postData.append('county', county);

    console.log(postData);

    this.http.post<{ message: string; church: Church }>('http://localhost:3000/create/church', postData)
      .subscribe(response => {
        console.log(response);

      });

  }
}


