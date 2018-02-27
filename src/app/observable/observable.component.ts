import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/services/http/http.service';
import { Follower } from '../shared/interfaces/follower';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.scss']
})
export class ObservableComponent implements OnInit {
  followers: Follower[];
  errorMessage: string;

  constructor(private _http: HttpService) {
  }

  ngOnInit() {
    this._http.getFollowers()
      .retryWhen((error) => error.delay(5000))
      .subscribe(response => {
        this.followers = response.followers;
        if (response.is_more) {
          do {
            this._http.getFollowers(response.next_page).subscribe(response => {
              this.followers = this.followers.concat(response.followers);
            });
          } while(!response.is_more)
        }
      }, error => console.log(error));
  }
}
