import { Injectable } from '@angular/core';

import { User } from '../models/user.model';

import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CreateDataService {

  constructor(private http: HttpClient) { }

  createUser(_id: null, name: string, email: string, password: string) {
    const newUser: User = {
      _id: _id,
      name: name,
      email: email,
      password: password
    };

    console.log(newUser);

    /*
    this.http.post('some address', newUser)
      .subscribe(response => {
        console.log(response);
      }, Error => {
        console.log(Error);
      });
      */


  }

  createToken(email: string, password: string) {
    const newToken = {
      email: email,
      password: password
    };

    console.log(newToken);

    /*
    this.http.post('some address', newToken)
      .subscribe(response => {
        console.log(response);
      }, Error => {
        console.log(Error);
      });
      */
  }
}
