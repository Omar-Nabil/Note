import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private _HttpClient:HttpClient) { }

  addNote(formData:object) : Observable<any> {
    return this._HttpClient.post(environment.baseUrl+'addNote', formData);
  }
  updateNote(formData:object) : Observable<any> {
    return this._HttpClient.put(environment.baseUrl+'updateNote', formData);
  }
  getData(data:object):Observable<any> {
    return this._HttpClient.post(environment.baseUrl+'getUserNotes', data);
  }
  deleteNote(formData:object):Observable<any> {
    return this._HttpClient.delete(environment.baseUrl+'deleteNote',formData);
  }
}
