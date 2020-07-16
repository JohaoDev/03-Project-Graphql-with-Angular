import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';

import gql from 'graphql-tag';

const getRoles = gql`
  {
    getRoles {
      _id
      name
      description
    }
  }
`;

const deleteRole = gql`
  mutation deleteRoles($_id: ID!) {
    deleteRole(_id: $_id)
  }
`;

// {
// "_id": "5f0dba45c6133d66aaee6e2d",
// "name": "client",
// "description": "Client module"
// },
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit, OnDestroy {
  rolesData = [];

  private querySubscription: Subscription;
  private deleteSubscription: Subscription;

  constructor(private apollo: Apollo, private router: Router) {}

  ngOnInit(): void {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: getRoles,
      })
      .valueChanges.subscribe(({ data }) => {
        this.rolesData = data.getRoles;
      });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  delete(_id) {
    this.deleteSubscription = this.apollo
      .mutate({
        mutation: deleteRole,
        variables: {
          _id,
        },
      })
      .subscribe(({ data }: any) => {
        if (data.deleteRole) {
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

  edit(roleData): void {
    localStorage.setItem('roleData', JSON.stringify(roleData));
    this.router.navigate(['/roles/edit']);
  }

  create() {
    this.router.navigate(['/roles/create']);
  }
}
