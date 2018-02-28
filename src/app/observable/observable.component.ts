import { Component, OnDestroy, OnInit } from '@angular/core';
import { Follower } from '../shared/interfaces/follower';
import { HttpService } from '../shared/services/http/http.service';


@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.scss']
})
export class ObservableComponent implements OnInit, OnDestroy {
  followers: Follower[];

  constructor(private _http: HttpService) {
  }

  ngOnInit() {
    this._http.followers.subscribe(response => {
      this.followers = response;
    }, error => console.log(error));
    this._http.loadAll();
  }

  ngOnDestroy() {
    this._http.dataStore = {followers: []};
  }
}
