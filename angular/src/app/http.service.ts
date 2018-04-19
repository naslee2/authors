import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class HttpService {
  data: any;
  constructor(private _http: HttpClient) { }

  addAuthor(newAuthor){
    return this._http.post('/new', {name: newAuthor});
  }

  deleteAuthor(check){
    return this._http.delete('/delete/'+check._id)
  }

  editAuthor(edit){
    return this._http.put('/update/'+edit.id, edit)
  }

  getAuthor(){
    return this._http.get('/author')
  }

}
