import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { EventService } from '../event.service';

import * as moment from 'moment';

export interface EventResult {
  _id: string,
  description: string,
  creator: string,
  startDate: Date,
  endDate: Date
}

export interface EventDashboardUnit {
  description: string,
  startDate: string,
  endDate: string,
  eventId: string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  eventQueryResults: EventResult[] = null;
  futureEvents: EventDashboardUnit[] = [];
  pastEvents: EventDashboardUnit[] = [];
  
  constructor(private authService: AuthService,
              private eventService: EventService) {
              }

  public logoutUser(){
    this.authService.logout();
  }

  public getAllEvents(){
    this.eventService.getAllEventsByUser().subscribe(
      (events => {
        this.eventQueryResults = events;
        this.updateEventList();
      })
    );
  }

  updateEventList(){
    var ev: EventDashboardUnit[] = [];
    var past: EventResult[] = [];
    var evp: EventDashboardUnit[] = [];

    this.eventQueryResults.sort((left, right): number => {
      if (moment(left.startDate).isBefore(moment(right.startDate))) return -1;
      if (left.startDate == right.startDate) return 0;
      return 1;
    });

    this.eventQueryResults.forEach(function (event){
      // if is a past event
      if (moment(event.endDate).isSameOrBefore(moment())){
        past.push(event); // push to the past group
      } else {
        ev.push({ // prepare the future events
          description: event.description,
          startDate: moment(event.startDate).format("DD/MM/YYYY, HH[h]mm"),
          endDate: moment(event.endDate).format("DD/MM/YYYY, HH[h]mm"),
          eventId: event._id
        });
      }    
    });

    past.sort((left, right): number => { // desc-sort past events by end date 
      if (moment(left.endDate).isBefore(moment(right.endDate))) return 1;
      if (left.endDate == right.endDate) return 0;
      return -1;
    });

    past.forEach(function (event){ // prepare the past events
      evp.push({
        description: event.description,
        startDate: moment(event.startDate).format("DD/MM/YYYY, HH[h]mm"),
        endDate: moment(event.endDate).format("DD/MM/YYYY, HH[h]mm"),
        eventId: event._id
      });
    })

    this.futureEvents = ev;
    this.pastEvents = evp;
  }

  ngOnInit() {
    this.getAllEvents();
  }

}
