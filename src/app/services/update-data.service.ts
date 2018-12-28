import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Church } from '../models/church.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UpdateDataService {

  private churches: Church[] = [];

  constructor(private http: HttpClient,
    private router: Router) { }

  // tslint:disable-next-line:max-line-length
  updateChurch(_id: string, title: string, year: string, denomination: string, city: string, county: string, history: string, image: string | File ) {
    console.log('UpdateData Service Church');
    let churchData: Church | FormData;
    if (typeof image === 'object') {
      churchData = new FormData();
      churchData.append('id', _id);
      churchData.append('title', title);
      churchData.append('history', history);
      churchData.append('year', year);
      churchData.append('denomination', denomination);
      churchData.append('image', image, title);
      churchData.append('city', city);
      churchData.append('county', county);
    } else {
      churchData = {
        _id: _id,
        title: title,
        history: history,
        year: year,
        denomination: denomination,
        imagePath: image,
        city: city,
          county: county,
      };
    }

    console.log(churchData);


   this.http.put('http://localhost:3000/update/church/' + _id, churchData)
   .subscribe( response => {
     console.log(response);
   })
   this.router.navigate(['/dashboard']);
  }
}
