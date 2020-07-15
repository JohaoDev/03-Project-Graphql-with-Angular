import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';

import gql from 'graphql-tag';

const editCourse = gql`
  mutation editCourse($_id: ID!, $input: EditCourseInput) {
    updateCourse(_id: $_id, input: $input)
  }
`;

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent implements OnInit, OnDestroy {
  editCourseForm: FormGroup;
  courseData: any;
  seeFile: any;

  private updateSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this._getCourseData();
    this._editCourseForm();
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }

  private _getCourseData() {
    this.courseData = JSON.parse(localStorage.getItem('courseData'));
  }

  _editCourseForm = () => {
    this.editCourseForm = this.formBuilder.group({
      title: [this.courseData.title, [Validators.required]],
      description: [this.courseData.description, [Validators.required]],
      topic: [this.courseData.topic, [Validators.required]],
    });
  };

  update(): void {
    let update = {
      data: {
        title: `${this.editCourseForm.get('title').value}`,
        description: `${this.editCourseForm.get('description').value}`,
        topic: `${this.editCourseForm.get('topic').value}`,
      },
    };
    console.log(this.courseData);
    this.updateSubscription = this.apollo
      .mutate<any>({
        mutation: editCourse,
        variables: {
          _id: this.courseData._id,
          input: update.data,
        },
      })
      .subscribe(
        ({ data }) => {
          console.log(data);
          data.updateCourse
            ? this.router.navigate(['/courses'])
            : alert('something went wrong, try again pls');
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
