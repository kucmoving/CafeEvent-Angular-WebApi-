import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) {}

  postEvent(data : any){
    return this.http.post<any>("http://localhost:3000/eventList",data);
  }
  getEvent(){
    return this.http.get<any>("http://localhost:3000/eventList");
  }
}
