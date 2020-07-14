import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DocsService } from '../../services/docs.service';

@Component({
  selector: 'app-docs-list',
  templateUrl: './docs-list.component.html',
  styleUrls: ['./docs-list.component.scss'],
})
export class DocsListComponent implements OnInit, OnDestroy {
  docs: Observable<string[]>;
  currentDoc: string;
  private _docSubscribe: Subscription;

  constructor(private docsService: DocsService) {}

  ngOnInit(): void {
    this.docs = this.docsService.docs;
    this._docSubscribe = this.docsService.currentDoc.subscribe(
      (doc) => (this.currentDoc = doc.id)
    );
  }

  ngOnDestroy() {
    this._docSubscribe.unsubscribe();
  }

  getDoc(id: string) {
    this.docsService.getDoc(id);
  }

  addDoc() {
    // let docPassword = prompt('Pls, write a password for your document');

    this.docsService.addDoc({ id: '', doc: '', userName: '' });
  }
}
