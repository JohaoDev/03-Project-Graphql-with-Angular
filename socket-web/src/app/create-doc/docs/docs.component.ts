import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { DocsService } from '../../services/docs.service';
import { Docs } from '../../models/docs';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
})
export class DocsComponent implements OnInit, OnDestroy {
  currentUserName: Observable<string>;
  document: Docs;
  private _docSubscribe: Subscription;

  constructor(private docsService: DocsService) {}

  ngOnInit(): void {
    this._docSubscribe = this.docsService.currentDoc
      .pipe(
        startWith({
          id: '',
          doc: 'Select or create a document',
          userName: '',
          docPassword: '',
        })
      )
      .subscribe((document) => (this.document = document));
  }

  ngOnDestroy() {
    this._docSubscribe.unsubscribe();
  }

  editDoc() {
    this._getuser();
    this.docsService.editDoc(this.document);
  }

  private _getuser() {
    let token = sessionStorage.getItem('token');
    let decoded = jwt_decode(token);

    this.document.userName = decoded.data.name;
  }
}
