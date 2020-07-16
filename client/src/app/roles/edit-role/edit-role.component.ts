import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';

import gql from 'graphql-tag';

const editRole = gql`
  mutation updateRole($_id: ID!, $input: EditRoleInput) {
    updateRole(_id: $_id, input: $input)
  }
`;

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss'],
})
export class EditRoleComponent implements OnInit {
  editRoleForm: FormGroup;
  roleData: any;
  seeFile: any;

  private updateSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this._getRoleData();
    this._editRoleForm();
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }

  private _getRoleData() {
    this.roleData = JSON.parse(localStorage.getItem('roleData'));
  }

  _editRoleForm = () => {
    this.editRoleForm = this.formBuilder.group({
      name: [this.roleData.name, [Validators.required]],
      description: [this.roleData.description, [Validators.required]],
    });
  };

  update(): void {
    let update = {
      data: {
        name: `${this.editRoleForm.get('name').value}`,
        description: `${this.editRoleForm.get('description').value}`,
      },
    };

    this.updateSubscription = this.apollo
      .mutate<any>({
        mutation: editRole,
        variables: {
          _id: this.roleData._id,
          input: update.data,
        },
      })
      .subscribe(
        ({ data }) => {
          console.log(data);
          data.updateRole
            ? this.router.navigate(['/roles'])
            : alert('something went wrong, try again pls');
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
