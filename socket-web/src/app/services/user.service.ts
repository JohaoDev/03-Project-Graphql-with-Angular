import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebServiceService } from './web-service.service';
import { PermissionsService } from './permissions.service';
import { DataRx } from '../models/data-rx';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string;

  constructor(
    private http: HttpClient,
    private server: WebServiceService,
    private permissions: PermissionsService
  ) {
    this.url = this.server.getUrl();
  }

  post(dataSend: object, endPoint: string): Array<any> {
    let returnData: Array<any> = [];
    this.http
      .post<DataRx>(
        `${this.url}${endPoint}`,
        dataSend,
        this.server.getHeaders()
      )
      .subscribe((data) => {
        console.log(data);
        if (data.ok) {
          returnData = data.data;
          this.permissions.decodeToken(data.token);
        } else {
          alert(data.msg);
        }
      });
    return returnData;
  }

  getUsers(): Array<any> {
    let returnData: Array<any> = [];
    this.http
      .get<DataRx>(`${this.url}users`, this.server.getHeaders())
      .subscribe((data) => {
        if (data.ok) {
          returnData = data.data;
          this.permissions.decodeToken(data.token);
        } else {
          alert(data.msg);
        }
      });
    return returnData;
  }

  getUser(id: string): Array<any> {
    let returnData: Array<any> = [];
    this.http
      .get<DataRx>(`${this.url}user/${id}`, this.server.getHeaders())
      .subscribe((data) => {
        if (data.ok) {
          returnData = data.data;
          this.permissions.decodeToken(data.token);
        } else {
          alert(data.msg);
        }
      });
    return returnData;
  }
}
