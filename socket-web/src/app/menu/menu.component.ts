import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const getUsers_API = environment.API_URL + 'users';
const deleteUser_API = environment.API_URL + 'user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  userData = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this._getuser();
  }

  private _getuser() {
    this.http.get(getUsers_API).subscribe((data: any) => {
      data.data.forEach((element) => {
        this.userData.push(element);
      });
    });
  }

  private _deleteuser(_id) {
    this.http.delete(`${deleteUser_API}/${_id}`).subscribe((data: any) => {
      console.log(data.data);
      if (data.data.deletedCount == 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Deleted',
          showConfirmButton: false,
          timer: 2000,
        });
        window.location.reload();
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Something was wrong, try again later',
          showConfirmButton: true,
          timer: 2000,
        });
      }
    });
  }

  private _edit(userData): void {
    localStorage.setItem('userData', JSON.stringify(userData));
    this.router.navigate(['/edit_user']);
  }
}
