import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// import { CrudService } from '../../services/crud.service';
// import { FilesService } from '../../services/files.service.js';
// import { DataRx } from 'src/app/models/data-rx';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  userData: any;
  seeFile: any;

  constructor(
    private formBuilder: FormBuilder,
    // private crudService: CrudService,
    private router: Router
  ) // private filesService: FilesService
  {}

  ngOnInit(): void {
    this._getUserData();
    this._editUserForm();
    // this.seeFile = this.filesService.getFile(
    //   'gallery',
    //   this.userData.profile_pic
    // );
  }

  private _getUserData() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  _editUserForm = () => {
    this.editUserForm = this.formBuilder.group({
      name: [this.userData.name, [Validators.required]],
      lastname: [this.userData.lastname, [Validators.required]],
      age: [this.userData.age, [Validators.required]],
      email: [this.userData.email, [Validators.required]],
      password: [this.userData.password, [Validators.required]],
      profile_pic: [this.userData.profile_pic, [Validators.required]],
    });
  };

  _update(): void {
    let updateData = {
      data: {
        name: this.editUserForm.get('name').value,
        lastname: this.editUserForm.get('lastname').value,
        age: this.editUserForm.get('age').value,
        email: this.editUserForm.get('email').value,
        password: this.editUserForm.get('password').value,
        profile_pic: this.editUserForm.get('profile_pic').value,
      },
    };

    // let updatedUser = this.crudService.patchData(
    //   updateData,
    //   'user',
    //   this.userData._id
    // );

    // if (updatedUser !== []) {
    //   this.router.navigate(['/users']);
    //   localStorage.clear();
    // }
  }
}
