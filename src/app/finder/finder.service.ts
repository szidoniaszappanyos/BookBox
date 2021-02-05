import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinderService {

  constructor(private http: HttpClient) {
  }

  findBooks(search: string): Observable<any> {
    const params = new HttpParams().set('q', search).set('maxResults', '40');
    return this.http.get('https://www.googleapis.com/books/v1/volumes', {params});
  }

  findBook(id: string): Observable<any> {
    return this.http.get('https://www.googleapis.com/books/v1/volumes/' + id);
  }
}
