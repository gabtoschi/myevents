import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import { MzToastService } from 'ngx-materialize';

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

  constructor(private route: ActivatedRoute, 
              private eventService: EventService, 
              private router: Router,
              private toastService: MzToastService) { }

  getEventData(){
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
    this.eventService.removeEvent(this.eventId).subscribe(
      () => {
        this.toastService.show('Evento removido!', 4000, 'green');
        this.router.navigateByUrl('/dashboard');
      },
      (err) => { 
        this.toastService.show('Aconteceu um erro durante a operação. Tente novamente.', 4000, 'red');
        console.error(err);
        this.router.navigateByUrl('/dashboard');
      }
    );
  }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.getEventData();
  }

}
