import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SocketIoModule } from 'ngx-socket-io';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketJwtService } from './services/socket-jwt.service';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditUserComponent } from './edit-user/edit-user.component';

// const config: SocketIoConfig = { url: 'http://localhost:3500', options: {} };

@NgModule({
  declarations: [AppComponent, LoginComponent, EditUserComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // SocketIoModule.forRoot(config),
    SocketIoModule,
    BrowserAnimationsModule,
  ],
  providers: [SocketJwtService],
  bootstrap: [AppComponent],
})
export class AppModule {}
