import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { FollowersResponse } from '../../interfaces/followers-response';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Follower } from '../../interfaces/follower';

@Injectable()
export class HttpService {
  followers: Observable<Follower[]>;
  private _followers: BehaviorSubject<Follower[]>;
  public dataStore: {
    followers: Follower[]
  };

  constructor(private http: HttpClient) {
    this.dataStore = {followers: []};
    this._followers = <BehaviorSubject<Follower[]>>new BehaviorSubject([]);
    this.followers = this._followers.asObservable();
  }


  loadAll(url?: string) {
    this.http.get<FollowersResponse>(typeof url !== 'undefined' ? url : 'http://localhost:4200/assets/data/followers.json')
      .do(data => {
        if (data.next_page) {
          this.dataStore.followers = !this.dataStore.followers.length ? data.followers : this.dataStore.followers.concat(data.followers);
          this.loadAll(data.next_page);
        } else {
          this._followers.next(this.dataStore.followers.concat(data.followers))
        }
      })
      .subscribe(data => {
        // console.log(data);
        },
        error => console.log('Could not load json.', error),
        // () => console.log('complete')
      );
  }

  getFollowersPromise(url?: string): Promise<FollowersResponse> {
    return this.http.get(typeof url !== 'undefined' ? url : 'http://localhost:4200/assets/data/followers.json')
      .toPromise()
      .then(response => response)
      .catch(error => error);
  }
}
