import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Follower } from '../shared/interfaces/follower';
import { HttpService } from '../shared/services/http/http.service';


@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.scss']
})
export class ObservableComponent implements OnInit {
  followers: Follower[];

  constructor(private _http: HttpService) {
  }

  ngOnInit() {
    this._http.getFollowers()
      .retryWhen((error) => error.delay(5000))
      .do(data => {
        if (data.is_more) {
          this._http.getFollowers(data.next_page).subscribe(newData => {
            if (this.followers.length) {
              this.followers = this.followers.concat(newData.followers);
            }
          });
        }
      })
      .subscribe(response => {
        this.followers = response.followers;
      }, error => console.log(error));
  }
}
