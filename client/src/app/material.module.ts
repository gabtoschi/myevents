import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MzButtonModule } from 'ngx-materialize';
import { MzNavbarModule } from 'ngx-materialize';
import { MzIconModule, MzIconMdiModule } from 'ngx-materialize';
import { MzCardModule } from 'ngx-materialize';
import { MzInputModule } from 'ngx-materialize';
import { MzCollapsibleModule } from 'ngx-materialize';
import { MzBadgeModule } from 'ngx-materialize';
import { MzCollectionModule } from 'ngx-materialize';
import { MzTextareaModule } from 'ngx-materialize';
import { MzDatepickerModule } from 'ngx-materialize';
import { MzTimepickerModule } from 'ngx-materialize';
import { MzToastModule } from 'ngx-materialize';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MzButtonModule,
    MzNavbarModule,
    MzIconModule,
    MzIconMdiModule,
    MzCardModule,
    MzInputModule,
    MzCollapsibleModule,
    MzBadgeModule,
    MzCollectionModule,
    MzTextareaModule,
    MzDatepickerModule,
    MzTimepickerModule,
    MzToastModule
  ],
  exports: [
    MzButtonModule,
    MzNavbarModule,
    MzIconModule,
    MzIconMdiModule,
    MzCardModule,
    MzInputModule,
    MzCollapsibleModule,
    MzBadgeModule,
    MzCollectionModule,
    MzTextareaModule,
    MzDatepickerModule,
    MzTimepickerModule,
    MzToastModule
  ]
})
export class MaterialModule { }
