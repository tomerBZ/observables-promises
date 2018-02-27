import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/services/http/http.service';
import { Follower } from '../shared/interfaces/follower';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styleUrls: ['./promise.component.scss']
})
export class PromiseComponent implements OnInit {
  followers: Follower[];
  errorMessage: String;


  constructor(private _http: HttpService) {
  }

  ngOnInit() {
    this._http.getFollowersPromise().then(response => {
        this.followers = response.followers;
        if (response.is_more) {
          do {
            this._http.getFollowersPromise(response.next_page).then(response => {
              this.followers = this.followers.concat(response.followers);
            });
          } while (!response.is_more);
        }
      },
      error => this.errorMessage = error.statusText);
  }
}
