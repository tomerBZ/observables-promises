import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PromiseComponent } from './promise/promise.component';
import { ObservableComponent } from './observable/observable.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from './shared/services/storage/storage.service';
import { HttpService } from './shared/services/http/http.service';
import { FollowerComponent } from './shared/components/follower/follower.component';


@NgModule({
  declarations: [
    AppComponent,
    PromiseComponent,
    ObservableComponent,
    FollowerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [StorageService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
