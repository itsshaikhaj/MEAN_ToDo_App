import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public url = "http://localhost:3000/todo/";

  constructor(
    private http: HttpClient
  ) { }

  /* Get TODO List  */
  getList() {
    return this.http
      .get(this.url)
      .pipe(map((results) => results));
  }

  /* Add ToDo */
  add(data: any) {
    return this.http
      .post(this.url, data)
      .pipe(map((results) => results));
  }

  /* Update Status */
  update(id: any, data: any) {
    return this.http
      .put(this.url + id, data)
      .pipe(map((results) => results));
  }

  /* Delete */
  delete(id: any) {
    return this.http
      .delete(this.url + id)
      .pipe(map((results) => results));
  }
}
