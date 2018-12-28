import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Church } from '../models/church.model';
import { map  } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ReadDataService {

  private churches: Church[] = [];
  private churchesUpdated = new Subject<Church[]>();

  constructor(private http: HttpClient) { }


  getChurches(): Observable< Church[]> {
    return this.http.get<Church[]>('http://localhost:3000/read/churches');
    }

  getUpdatedChurchesListener() {
   return this.churchesUpdated.asObservable();
  }

  getChurch(churchId: string): Observable<Church> {
    return this.http.get<Church>('http://localhost:3000/read/church/' + churchId);
  }


}
