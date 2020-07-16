import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesComponent } from './roles.component';
import { NewRoleComponent } from './new-role/new-role.component';
import { EditRoleComponent } from './edit-role/edit-role.component';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent,
  },
  {
    path: 'create',
    component: NewRoleComponent,
  },
  {
    path: 'edit',
    component: EditRoleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}
