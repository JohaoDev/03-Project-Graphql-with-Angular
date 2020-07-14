import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

// const postUser_API = environment.API_URL + 'user';
export interface DataUser {
  data: {
    name: string;
    lastname: string;
    age: number;
    email: string;
    password: string;
  };
}

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  createUserForm: FormGroup;
  dataUser: DataUser;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    // private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._createUserForm();
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
      data: {
        name: this.createUserForm.get('name').value,
        lastname: this.createUserForm.get('lastname').value,
        age: this.createUserForm.get('age').value,
        email: this.createUserForm.get('email').value,
        password: this.createUserForm.get('password').value,
      },
    };

    let confirmPassword = this.createUserForm.get('confirmPassword').value;

    if (this.dataUser.data.password === confirmPassword) {
      if (
        this.dataUser.data.name &&
        this.dataUser.data.lastname &&
        this.dataUser.data.email
      ) {
        const dataUser = {
          data: this.dataUser.data,
        };

        let savedUser = this.userService.post(dataUser, 'user');
        if (savedUser !== []) {
          this.router.navigate(['/menu']);
        }
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

  // _create = () => {
  //   let name = this.createUserForm.get('name').value;
  //   let lastname = this.createUserForm.get('lastname').value;
  //   let age = this.createUserForm.get('age').value;
  //   let email = this.createUserForm.get('email').value;
  //   let password = this.createUserForm.get('password').value;

  //   if (this.createUserForm.invalid) {
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'error',
  //       title: 'Fill all the gaps to continue',
  //       showConfirmButton: false,
  //       timer: 2000,
  //     });
  //   } else {
  //     let userData = {
  //       user: {
  //         name,
  //         lastname,
  //         age,
  //         email,
  //         password,
  //         rol: 'Client',
  //       },
  //     };

  //     this.http.post(`${postUser_API}`, userData).subscribe((data: any) => {
  //       if (data.ok) {
  //         Swal.fire({
  //           position: 'center',
  //           icon: 'success',
  //           title: 'Created',
  //           showConfirmButton: false,
  //           timer: 2000,
  //         });
  //         this.router.navigate(['/menu']);
  //       } else {
  //         Swal.fire({
  //           position: 'center',
  //           icon: 'error',
  //           title: 'Something went wrong, try again later',
  //           showConfirmButton: true,
  //         });
  //       }
  //     });
  //   }
  // };
}
