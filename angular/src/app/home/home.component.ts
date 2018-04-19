import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) {}
  id: any;
  homedata: any;
  ngOnInit() {
    this.showAuthorHome()
  }

  showAuthorHome(){
    let x = this._httpService.getAuthor();
    x.subscribe(data => {
      console.log("woah", data);
      this.homedata = data['data'];
    })
  }

  deleteAuthorHome(x){
    console.log(x);
    let y = this._httpService.deleteAuthor(x);
    y.subscribe(data => {
      console.log("woah", data);
      this.id=data['data'];
    })
    this.showAuthorHome()
  }

  editAuthorHome(x){
    console.log(x);
    this._router.navigate(['/edit/'+x['_id']]);
    this._httpService.data = x;
  }
}
