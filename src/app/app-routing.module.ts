import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromiseComponent } from './promise/promise.component';
import { ObservableComponent } from './observable/observable.component';

const routes: Routes = [
      {
        path: 'promise',
        component: PromiseComponent
      },
      {
        path: 'observable',
        component: ObservableComponent
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
