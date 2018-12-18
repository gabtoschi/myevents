import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

export interface EventInfo {
  description: string,
  userId: string,
  startDate: Date,
  endDate: Date
}

export interface CreateEventFormData {
  description: string,
  startDate: Date,
  endDate: Date
}

export interface CreateEventResponse{
  success: true
}

const apiUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  public createEvent(formData: CreateEventFormData) : Observable<any>{
    let base;

    let info: EventInfo = {
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate,
      userId: this.authService.getUserInfo()._id
    };

    base = this.http.post(`${apiUrl}/event`, info);

    const request = base.pipe(
      map((data: CreateEventResponse) => {
        return data;
      })
    );

    return request;
  }

  public getAllEventsByUser() : Observable<any>{
    let userId = this.authService.getUserInfo()._id;

    return this.http.get(`${apiUrl}/event/all/${userId}`);
  }

  public getEventById(eventId): Observable<any>{
    return this.http.get(`${apiUrl}/event/${eventId}`);
  }

}
