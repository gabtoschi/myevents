import { Component, OnInit } from '@angular/core';

import { MzModalService } from 'ngx-materialize';
import { CreateEventComponent } from '../create-event/create-event.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private modalService: MzModalService) {}

  public openCreateEventModal(){
    this.modalService.open(CreateEventComponent);
  }

  ngOnInit() {
  }

}