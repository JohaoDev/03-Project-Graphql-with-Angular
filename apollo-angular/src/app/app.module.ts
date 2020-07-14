import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink }from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'

import { AppComponent } from './app.component';

import { CrearCursoComponent } from './crear-curso/crear-curso.component';
import { CrearNuevaPersonaComponent } from './crear-nueva-persona/crear-nueva-persona.component';
import { VerPersonasycursosComponent } from './ver-personasycursos/ver-personasycursos.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearCursoComponent,
    CrearNuevaPersonaComponent,
    VerPersonasycursosComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor (
    apollo : Apollo,
    httpLink : HttpLink
  ){
    apollo.create({
      link: httpLink.create({ uri:''}),
      cache: new InMemoryCache()
    })
  }
}
