import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearCursoComponent } from './crear-curso/crear-curso.component';
import { CrearNuevaPersonaComponent } from './crear-nueva-persona/crear-nueva-persona.component';
import { LoginComponent } from './login/login.component';
import { VerPersonasycursosComponent } from './ver-personasycursos/ver-personasycursos.component'


const routes: Routes = [
  {path: 'crear_curso', component: CrearCursoComponent},
  {path: 'crear_nueva_persona', component: CrearNuevaPersonaComponent},
  {path: 'login', component: LoginComponent},
  {path: 'ver_personas_cursos', component: VerPersonasycursosComponent},

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
