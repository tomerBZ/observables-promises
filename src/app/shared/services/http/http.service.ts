import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { FollowersResponse } from '../../interfaces/followers-response';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getFollowers(url?: string): Observable<FollowersResponse> {
    return this.http.get<FollowersResponse>(typeof url !== 'undefined' ? url : 'http://localhost:4200/assets/data/followers.json')
      .map(response => response)
      .catch((error) => Observable.throw(error));
  }

  getFollowersPromise(url?: string): Promise<FollowersResponse> {
    return this.http.get(typeof url !== 'undefined' ? url : 'http://localhost:4200/assets/data/followers.json')
      .toPromise()
      .then(response => response)
      .catch(error => error);
  }
}
