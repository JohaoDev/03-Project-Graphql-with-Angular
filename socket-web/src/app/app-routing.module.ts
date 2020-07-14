import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: 'login', component: LoginComponent },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then((m) => m.MenuModule),
    canActivate: [LoginGuard]
  },
  { path: 'edit_user', component: EditUserComponent },
  {
    path: 'new_user',
    loadChildren: () =>
      import('./new-user/new-user.module').then((m) => m.NewUserModule),
  },
  {
    path: 'create_doc',
    loadChildren: () =>
      import('./create-doc/create-doc.module').then((m) => m.CreateDocModule),
  },
  // { path: "not-found", component: NotFoundComponent }
  // { path: "not-found", redirectTo: "/login", pathMatch: "full" }
  { path: "**", redirectTo: "/login", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
