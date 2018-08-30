import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from '../components/app.component';
import { SideBarComponent } from '../components/side-bar/side-bar.component';
import { OverviewComponent } from '../components/overview/overview.component';
import { ServiceLogComponent } from '../components/service-log/service-log.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { EntryComponent } from '../components/entry/entry.component';
import { RegisterFormComponent } from '../components/register-form/register-form.component';
import { LoginFormComponent } from '../components/login-form/login-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    OverviewComponent,
    ServiceLogComponent,
    SettingsComponent,
    EntryComponent,
    RegisterFormComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
