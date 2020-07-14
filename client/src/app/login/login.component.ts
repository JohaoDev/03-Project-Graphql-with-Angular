import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import gql from 'graphql-tag';

const loginAuth = gql`
  {
    dogs {
      id
      breed
    }
  }
`;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login: Observable<any>;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {}

  _login() {
    this.login = this.apollo
      .watchQuery({
        query: loginAuth,
      })
      .valueChanges.pipe(map((result) => result.data));
  }

  //   this.courses = this.apollo.watchQuery<Query>({
  //     query: gql`
  //       query allCourses {
  //         allCourses {
  //           id
  //           title
  //           author
  //           description
  //           topic
  //           url
  //         }
  //       }
  //     `
  //   })
  //     .valueChanges
  //     .pipe(
  //       map(result => result.data.allCourses)
  //     );
  // }
}
