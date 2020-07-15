import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';

import gql from 'graphql-tag';

const getCourses = gql`
  {
    getCourses {
      _id
      title
      description
      topic
      level
    }
  }
`;

const deleteCourse = gql`
  mutation deleteCourse($_id: ID!) {
    deleteCourse(_id: $_id)
  }
`;

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courseData = [];

  private querySubscription: Subscription;
  private deleteSubscription: Subscription;

  constructor(private apollo: Apollo, private router: Router) {}

  ngOnInit(): void {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: getCourses,
      })
      .valueChanges.subscribe(({ data }) => {
        this.courseData = data.getCourses;
      });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  delete(_id) {
    this.deleteSubscription = this.apollo
      .mutate({
        mutation: deleteCourse,
        variables: {
          _id,
        },
      })
      .subscribe(({ data }: any) => {
        if (data.deleteCourse) {
          window.location.reload();
          this.deleteSubscription.unsubscribe();

          // this.router
          //   .navigateByUrl('/', { skipLocationChange: true })
          //   .then(() => {
          //     this.router.navigate(['/courses']);
          //   });
        } else {
          alert('something went wrong');
        }
      });
  }

  edit(courseData): void {
    localStorage.setItem('courseData', JSON.stringify(courseData));
    this.router.navigate(['/courses/edit']);
  }

  create() {
    this.router.navigate(['/courses/create']);
  }
}
