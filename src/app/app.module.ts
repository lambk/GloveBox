import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { OverviewComponent } from './overview/overview.component';
import { ServiceLogComponent } from './service-log/service-log.component';
import { SettingsComponent } from './settings/settings.component';
import { EntryComponent } from './entry/entry.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginFormComponent } from './login-form/login-form.component';

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
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
