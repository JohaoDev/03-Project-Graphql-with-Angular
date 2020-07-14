import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { PermisosService } from './permisos.service';

@Injectable({
  providedIn: 'root',
})
export class WebServiceService {
  private url: string;

  constructor(private permissions: PermisosService) {
    this.url = 'http://localhost:27017/api/';
  }

  getUrl(): string {
    return this.url;
  }

  getHeaders(): object {
    const optionsHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: this.permissions.obtenerToken(),
      }),
    };
    return optionsHeaders;
  }

  getHeaderFile(): object {
    const optionsHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        Authorization: this.permissions.obtenerToken(),
      }),
    };
    return optionsHeaders;
  }
}