import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { shim } from 'promise.prototype.finally';
import { MomentModule } from 'ngx-moment';

import { AppComponent } from '../components/app.component';
import { SideBarComponent } from '../components/side-bar/side-bar.component';
import { OverviewComponent } from '../components/overview/overview.component';
import { ServiceLogComponent } from '../components/service-log/service-log.component';
import { GarageComponent } from '../components/garage/garage.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { EntryComponent } from '../components/entry/entry.component';
import { RegisterFormComponent } from '../components/register-form/register-form.component';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { RegisterVehicleFormComponent } from '../components/register-vehicle-form/register-vehicle-form.component';
import { LoadingOverlayComponent } from '../components/loading-overlay/loading-overlay.component';
import { AlertComponent } from '../components/alert/alert.component';
import { RangePipe } from '../util/range-pipe';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { RegisterVehicleModalComponent } from '../components/register-vehicle-modal/register-vehicle-modal.component';
import { GarageTableComponent } from '../components/garage-table/garage-table.component';
import { VehicleComponent } from '../components/vehicle/vehicle.component';

shim();

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    OverviewComponent,
    ServiceLogComponent,
    GarageComponent,
    SettingsComponent,
    EntryComponent,
    RegisterFormComponent,
    LoginFormComponent,
    RegisterVehicleFormComponent,
    LoadingOverlayComponent,
    AlertComponent,
    RangePipe,
    PaginationComponent,
    RegisterVehicleModalComponent,
    GarageTableComponent,
    VehicleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    MomentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
