import { Component, OnInit } from '@angular/core';
import { MzBaseModal } from 'ngx-materialize';
 
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent extends MzBaseModal {

  constructor() {
    super();
  }

}
