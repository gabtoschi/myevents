import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';

import * as moment from 'moment';

export interface EventResult {
  _id: string,
  description: string,
  userId: string,
  startDate: Date,
  endDate: Date
}

export interface EventFront {
  description: string,
  startDate: string,
  endDate: string
}

@Component({
  selector: 'app-remove-event',
  templateUrl: './remove-event.component.html',
  styleUrls: ['./remove-event.component.css']
})
export class RemoveEventComponent implements OnInit {
  eventId: string;
  eventData: EventResult;
  event: EventFront = {
    description: 'ph', startDate: 'ph', endDate: 'ph'
  };

  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  getEventData(){
    console.log(this.eventId);
    this.eventService.getEventById(this.eventId).subscribe((
      event => {
        this.eventData = event;
        this.generateEventFront();
      }
    ))
  }

  generateEventFront(){
    this.event = {
      description: this.eventData.description,
      startDate: moment(this.eventData.startDate).format("DD/MM/YYYY, HH[h]mm"),
      endDate: moment(this.eventData.endDate).format("DD/MM/YYYY, HH[h]mm")
    }
  }

  removeEvent(){
    console.log("todo");
  }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.getEventData();
  }

}
