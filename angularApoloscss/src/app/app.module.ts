import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink }from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { GraphQLModule } from './graphql.module';
import { CrearCursoComponent } from './crear-curso/crear-curso.component';
import { CrearNuevaPersonaComponent } from './crear-nueva-persona/crear-nueva-persona.component';
import { LoginComponent } from './login/login.component';
import { VerPersonasycursosComponent } from './ver-personasycursos/ver-personasycursos.component'


@NgModule({
  declarations: [
    AppComponent,
    CrearCursoComponent,
    CrearNuevaPersonaComponent,
    LoginComponent,
    VerPersonasycursosComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    InMemoryCache,
    GraphQLModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
