import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

const updateUser_API = environment.API_URL + 'user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  userData: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getUserData();
    this._editUserForm();
  }

  private _getUserData = () => {
    this.userData = JSON.parse(localStorage.getItem('userData'));
  };

  _editUserForm = () => {
    this.editUserForm = this.formBuilder.group({
      name: [this.userData.name, [Validators.required]],
      lastname: [this.userData.lastname, [Validators.required]],
      age: [this.userData.age, [Validators.required]],
      email: [this.userData.email, [Validators.required]],
      rol: [
        { value: this.userData.rol, disabled: true },
        [Validators.required],
      ],
    });
  };

  _update = () => {
    let name = this.editUserForm.get('name').value;
    let lastname = this.editUserForm.get('lastname').value;
    let age = this.editUserForm.get('age').value;
    let email = this.editUserForm.get('email').value;

    if (this.editUserForm.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Fill all the gaps to continue',
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      let userData = {
        data: {
          name,
          lastname,
          age,
          email,
        },
      };
      this.http
        .patch(`${updateUser_API}/${this.userData._id}`, userData)
        .subscribe((data: any) => {
          if (data.ok) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Updated',
              showConfirmButton: false,
              timer: 2000,
            });
            localStorage.removeItem('userData');
            this.router.navigate(['/menu']);
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Something went wrong, try again later',
              showConfirmButton: true,
            });
          }
        });
    }
  };
}
