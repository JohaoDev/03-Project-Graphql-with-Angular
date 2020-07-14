import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CreateDocRoutingModule } from './create-doc-routing.module';
import { CreateDocComponent } from './create-doc.component';
import { DocsComponent } from './docs/docs.component';
import { DocsListComponent } from './docs-list/docs-list.component';

import { SocketIoModule } from 'ngx-socket-io';
import { SocketJwtService } from '../services/socket-jwt.service';

@NgModule({
  declarations: [CreateDocComponent, DocsComponent, DocsListComponent],
  imports: [CommonModule, CreateDocRoutingModule, FormsModule, SocketIoModule],
  providers: [SocketJwtService],
})
export class CreateDocModule {}
