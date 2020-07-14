import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NewUserComponent } from './new-user/new-user.component';

@NgModule({
  declarations: [EditUserComponent, NewUserComponent],
  imports: [CommonModule, UsersRoutingModule, FormsModule, ReactiveFormsModule],
})
export class UsersModule {}
