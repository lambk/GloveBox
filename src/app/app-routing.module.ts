import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { ServiceLogComponent } from './service-log/service-log.component';

const routes: Routes = [
  {
    path: 'overview',
    component: OverviewComponent
  },
  {
    path: 'log',
    component: ServiceLogComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
