import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RolesRoutingModule } from './roles-routing.module';
import { NewRoleComponent } from './new-role/new-role.component';
import { EditRoleComponent } from './edit-role/edit-role.component';

@NgModule({
  declarations: [NewRoleComponent, EditRoleComponent],
  imports: [CommonModule, RolesRoutingModule, FormsModule, ReactiveFormsModule],
})
export class RolesModule {}
