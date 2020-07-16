import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';

import gql from 'graphql-tag';
import { PermissionsService } from '../services/permissions.service';

const loginAuth = gql`
  query login($email: String, $password: String) {
    login(email: $email, password: $password)
  }
`;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  dataLogin;

  private querySubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private permissions: PermissionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._loginForm();
    this._login();
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

  _loginForm = () => {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  };

  _login() {
    let email = this.loginForm.get('email').value,
      password = this.loginForm.get('password').value;

    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: loginAuth,
        variables: {
          email,
          password,
        },
      })
      .valueChanges.subscribe(({ data }) => {
        console.log(data);
        if (data.login !== null) {
          this.dataLogin = data;
          this.permissions.decodeToken(data.login.token);
          this.router.navigate(['/home']);
          console.log(this.permissions.getUserLogin());
        } else {
          console.log('data null');
        }
      });
  }
}
