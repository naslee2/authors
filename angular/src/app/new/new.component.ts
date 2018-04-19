import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IfObservable } from 'rxjs/observable/IfObservable';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) {}
  newAuthor: String;
  error: any;
  ngOnInit() {
  }

  onClickAdd(){
    let obs = this._httpService.addAuthor(this.newAuthor)
    obs.subscribe(data => {
      if(data['message'] == 'Error'){
        this.error = "Invalid Name"
      }
      else{
        this._router.navigate(['/home']);
      }
    })
  }
}
