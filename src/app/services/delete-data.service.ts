import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeleteDataService {

  constructor(private http: HttpClient ) { }

  deleteChurch(churchId: string) {
    console.log('Delete Data Service ');
      this.http.delete(`http://localhost:3000/delete/church/` + churchId)
        .subscribe(response => {
          console.log(response);
        });
  }
}
