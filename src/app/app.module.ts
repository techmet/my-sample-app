import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgIdleModule } from '@ng-idle/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgIdleModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
