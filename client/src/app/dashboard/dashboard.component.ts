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
  allEvents: EventDashboardUnit[] = [];
  
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

    this.eventQueryResults.forEach(function (event){
      ev.push({
        description: event.description,
        startDate: moment(event.startDate).format("DD/MM/YYYY, HH[h]mm"),
        endDate: moment(event.endDate).format("DD/MM/YYYY, HH[h]mm"),
        eventId: event._id
      });
    });

    this.allEvents = ev;
  }

  ngOnInit() {
    this.getAllEvents();
  }

}
