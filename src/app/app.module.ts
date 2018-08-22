import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { OverviewComponent } from './overview/overview.component';
import { ServiceLogComponent } from './service-log/service-log.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    OverviewComponent,
    ServiceLogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
