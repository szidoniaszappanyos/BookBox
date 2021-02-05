import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopSearchService {

  constructor(private http: HttpClient) {
  }

  saveLink(id: string): Observable<any> {
    return this.http.post('http://localhost:3000/volumes', {id: id});
  }

  saveCategory(name: string): Observable<any> {
    return this.http.post('http://localhost:3000/categories' ,  {name: name});
  }

  getTopLinks(): Observable<any> {
    return this.http.get('http://localhost:3000/volumes/all');
  }

  getTopCategories(): Observable<any> {
    return this.http.get('http://localhost:3000/categories/all');
  }
}
