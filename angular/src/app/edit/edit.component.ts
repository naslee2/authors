import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) {}
  edit: any;
  author: any;
  error: any;
  ngOnInit() {
    this.edit = {name: "", id: ""};
    this.edit['name'] = this._httpService.data['name'];
    this.edit['id']= this._httpService.data['_id'];
  }

  onClickEdit(){
    let obs = this._httpService.editAuthor(this.edit)
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

