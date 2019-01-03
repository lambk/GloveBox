import { VehicleComponent } from './../components/vehicle/vehicle.component';
import { AuthGuard } from './../guard/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from '../components/overview/overview.component';
import { ServiceLogComponent } from '../components/service-log/service-log.component';
import { GarageComponent } from '../components/garage/garage.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { EntryComponent } from '../components/entry/entry.component';

const routes: Routes = [
  {
    path: 'login',
    component: EntryComponent
  },
  {
    path: '',
    component: OverviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'log',
    component: ServiceLogComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'garage',
    component: GarageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'vehicle/:plate',
    component: VehicleComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
