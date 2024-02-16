import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
    readonly apiurl ="http://localhost:60386/api";

  constructor(private http:HttpClient) { }

  getstudent(): Observable<any[]>
  {
   return  this.http.get<any>(this.apiurl+'/Student');
  }
  addstudent(val:any)
  {
    return this.http.post(this.apiurl+'/Student',val);
  }
  updatestudent(val:any)
  {
    return this.http.put(this.apiurl+'/Student',val);
  }
  deletestudent(val:any)
  {
    return this.http.delete(this.apiurl+'/Student/'+val);
  }
}
