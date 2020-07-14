import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { DataRx } from '../models/data-rx';
import { LoginService } from '../services/login.service';
import { PermissionsService } from '../services/permissions.service';

// const login_API = environment.API_URL + 'login';
export interface DataLogin {
  data: {
    email: string;
    password: string;
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  dataLogin: DataLogin;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private permissions: PermissionsService,
    // private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._loginForm();
    this.dataLogin = {
      data: {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      },
    };
  }

  _loginForm = () => {
    this.loginForm = this.formBuilder.group({
      email: ['johao@gmail.com', [Validators.required]],
      password: ['1234', [Validators.required]],
    });
  };

  login(): void {
    this.loginService.logIn(this.dataLogin).subscribe(
      (res: DataRx) => {
        if (res.ok) {
          if (this.permissions.decodeToken(res.token)) {
            this.router.navigate(['/menu']);
            // console.log(this.permissions.getUserLogin());
          }
        } else {
          this.dataLogin.data.email = '';
          this.dataLogin.data.password = '';
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: res.msg,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      },
      (error) => {
        this.dataLogin.data.email = '';
        this.dataLogin.data.password = '';
        console.log(error);
      }
    );
  }

  // _signIn = () => {
  //   let email = this.loginForm.get('email').value,
  //     password = this.loginForm.get('password').value;

  //   if (this.loginForm.invalid) {
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'error',
  //       title: 'Fill all the gaps to continue',
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //   } else {
  //     let signInData = {
  //       data: {
  //         email,
  //         password,
  //       },
  //     };

  //     this.http.post(login_API, signInData).subscribe((data: any) => {
  //       data.ok
  //         ? (sessionStorage.setItem('token', data.token),
  //           this.router.navigate(['/menu']))
  //         : Swal.fire({
  //             position: 'center',
  //             icon: 'error',
  //             title: 'Incorrect data',
  //             showConfirmButton: false,
  //             timer: 1500,
  //           });
  //     });
  //   }
  // };
}
