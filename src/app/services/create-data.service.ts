import { Injectable } from '@angular/core';

import { User } from '../models/user.model';

import { HttpClient } from '@angular/common/http';
import {Church } from '../models/church.model';

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

  createChurch (title: string, year: string, denomination: string, city: string, county: string, history: string, image: file) {

    const postData = new FormData();
    postData.append('title', title);
    postData.append('history', history);
    postData.append('year', year);
    postData.append('denomination', denomination);
    postData.append('image', image, title);
    postData.append('city', city);
    postData.append('county', county);

    /*
    const church = {
      title: title,
      year: year,
      denomination: denomination,
      city: city,
      county: county,
      history: history,
      imagePath: imagePath
    };
    */
    console.log(postData);

    this.http.post<{ message: string; church: Church }>('http://localhost:3000/create/church', postData)
      .subscribe(response => {
        console.log(response);
      });

  }
}

/*

  export interface Church {
  id: String;
  title: String;
  history: String;
  year: String;
  denomination: String;
  city: String;
  county: String;
  imagePath: String;
}


*/
