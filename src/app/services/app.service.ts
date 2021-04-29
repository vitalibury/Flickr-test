import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Photo } from '../shared/interfaces.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  loadPhotos(tag: string, page: number): Observable<Photo> {
    const params = `api_key=${environment.flickrKey}&text=${tag}&format=json&nojsoncallback=1&page=${page}`;
    return this.http.get<any>(environment.flickrUrl + params);
  }

  createBookmark(data: any): Observable<any> {
    return this.http.post(`${environment.backendUrl}/bookmarks.json`, data);
  }

  loadBookmarks(): Observable<any> {
    return this.http.get(`${environment.backendUrl}/bookmarks.json`);
  }

  deleteBookmark(id: string):Observable<void> {
    return this.http.delete<void>(`${environment.backendUrl}/bookmarks/${id}.json`);
  }
}
