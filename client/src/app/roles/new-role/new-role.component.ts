import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';

import gql from 'graphql-tag';

const postRole = gql`
  mutation postRole($input: RoleInput!) {
    createRole(input: $input)
  }
`;

@Component({
  selector: 'app-new-role',
  templateUrl: './new-role.component.html',
  styleUrls: ['./new-role.component.scss'],
})
export class NewRoleComponent implements OnInit {
  createRoleForm: FormGroup;
  dataRole;

  private postSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this._createRoleForm();
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

  _createRoleForm = () => {
    this.createRoleForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  };

  registerRole(): void {
    this.dataRole = {
      data: {
        name: `${this.createRoleForm.get('name').value}`,
        description: `${this.createRoleForm.get('description').value}`,
      },
    };

    this.postSubscription = this.apollo
      .mutate<any>({
        mutation: postRole,
        variables: {
          input: this.dataRole.data,
        },
      })
      .subscribe(
        ({ data }) => {
          console.log(data);
          data.createRole
            ? this.router.navigate(['/roles'])
            : alert('something went wrong, try again pls');
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
