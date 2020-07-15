import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';

import gql from 'graphql-tag';

const getUsers = gql`
  {
    getPersons {
      _id
      name
      lastname
      email
      profile_pic
      password
      role
    }
  }
`;

const deleteUser = gql`
  mutation deleteUser($_id: ID!) {
    deletePerson(_id: $_id)
  }
`;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  userData = [];

  private querySubscription: Subscription;
  private deleteSubscription: Subscription;

  constructor(private apollo: Apollo, private router: Router) {}

  ngOnInit(): void {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: getUsers,
      })
      .valueChanges.subscribe(({ data }) => {
        this.userData = data.getPersons;
      });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  delete(_id) {
    this.deleteSubscription = this.apollo
      .mutate({
        mutation: deleteUser,
        variables: {
          _id,
        },
      })
      .subscribe(({ data }: any) => {
        if (data.deletePerson) {
          window.location.reload();
          this.deleteSubscription.unsubscribe();

          // this.router
          //   .navigateByUrl('/', { skipLocationChange: true })
          //   .then(() => {
          //     this.router.navigate(['/users']);
          //   });
        } else {
          alert('something went wrong');
        }
      });
  }

  edit(userData): void {
    localStorage.setItem('userData', JSON.stringify(userData));
    this.router.navigate(['/users/edit']);
  }

  goCreateUser() {
    this.router.navigate(['/users/create']);
  }
}
