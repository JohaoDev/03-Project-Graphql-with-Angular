import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';

import gql from 'graphql-tag';

const postUser = gql`
  mutation postUser($input: PersonInput!) {
    createPerson(input: $input)
  }
`;

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit, OnDestroy {
  createUserForm: FormGroup;
  dataUser;

  private postSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this._createUserForm();
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

  _createUserForm = () => {
    this.createUserForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      age: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  };

  registerUser(): void {
    this.dataUser = {
      input: {
        name: this.createUserForm.get('name').value,
        lastname: this.createUserForm.get('lastname').value,
        age: this.createUserForm.get('age').value,
        email: this.createUserForm.get('email').value,
        password: this.createUserForm.get('password').value,
      },
    };

    let confirmPassword = this.createUserForm.get('confirmPassword').value;

    if (this.dataUser.input.password === confirmPassword) {
      if (
        this.dataUser.input.name &&
        this.dataUser.input.lastname &&
        this.dataUser.input.email
      ) {
        let dataUser = {
          input: this.dataUser,
        };

        this.postSubscription = this.apollo
          .mutate({
            mutation: postUser,
            variables: {
              input: dataUser,
            },
          })
          .subscribe(({ data }) => {
            console.log(data);
          });

        // if (savedUser !== []) {
        //   this.router.navigate(['users']);
        // }
      } else {
        console.log('Fill al the gaps to continue please');
      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: "passwords don't match, try again",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }
}
