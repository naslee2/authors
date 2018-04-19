import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  ngOnInit() {
  }

  onClickAdd(){
    let obs = this._httpService.addAuthor(this.newAuthor)
    obs.subscribe(data => console.log(data))
    this._router.navigate(['/home']);
  }
}
