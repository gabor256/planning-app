import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core.module";
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, //Ez kell ha nem Template driven Formot használunk
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot(fromApp.appReducer, {}),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
