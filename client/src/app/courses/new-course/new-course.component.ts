import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';

import gql from 'graphql-tag';

const postCourse = gql`
  mutation postCourse($input: CourseInput!) {
    createCourse(input: $input)
  }
`;

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss'],
})
export class NewCourseComponent implements OnInit, OnDestroy {
  createCourseForm: FormGroup;
  dataCourse;

  private postSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this._createCourseForm();
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

  _createCourseForm = () => {
    this.createCourseForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      topic: ['', [Validators.required]],
    });
  };

  registerCourse(): void {
    this.dataCourse = {
      data: {
        title: `${this.createCourseForm.get('title').value}`,
        description: `${this.createCourseForm.get('description').value}`,
        topic: `${this.createCourseForm.get('topic').value}`,
      },
    };

    this.postSubscription = this.apollo
      .mutate<any>({
        mutation: postCourse,
        variables: {
          input: this.dataCourse.data,
        },
      })
      .subscribe(
        ({ data }) => {
          console.log(data);
          data.createCourse
            ? this.router.navigate(['/courses'])
            : alert('something went wrong, try again pls');
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
