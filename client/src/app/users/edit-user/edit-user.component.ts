import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';

import gql from 'graphql-tag';

const editUser = gql`
  mutation editUser($_id: ID!, $input: EditPersonInput) {
    updatePerson(_id: $_id, input: $input)
  }
`;

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit, OnDestroy {
  editUserForm: FormGroup;
  userData: any;
  seeFile: any;

  private updateSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this._getUserData();
    this._editUserForm();
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }

  private _getUserData() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  _editUserForm = () => {
    this.editUserForm = this.formBuilder.group({
      _id: [this.userData._id],
      name: [this.userData.name, [Validators.required]],
      lastname: [this.userData.lastname, [Validators.required]],
      age: [this.userData.age, [Validators.required]],
      email: [this.userData.email, [Validators.required]],
      password: [this.userData.password, [Validators.required]],
      profile_pic: [this.userData.profile_pic, [Validators.required]],
    });
  };

  _update(): void {
    let update = {
      data: {
        name: `${this.editUserForm.get('name').value}`,
        lastname: `${this.editUserForm.get('lastname').value}`,
        age: `${this.editUserForm.get('age').value}`,
        email: `${this.editUserForm.get('email').value}`,
        password: `${this.editUserForm.get('password').value}`,
      },
    };

    this.updateSubscription = this.apollo
      .mutate<any>({
        mutation: editUser,
        variables: {
          _id: this.userData._id,
          input: update.data,
        },
      })
      .subscribe(
        ({ data }) => {
          console.log(data);
          data.updatePerson
            ? this.router.navigate(['/users'])
            : alert('something went wrong, try again pls');
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
