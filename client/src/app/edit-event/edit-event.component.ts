import { Component, OnInit } from '@angular/core';
import { MzToastService } from 'ngx-materialize';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { EventService, EventFormData } from '../event.service';

import * as moment from 'moment';

export interface EventResult {
  _id: string,
  description: string,
  userId: string,
  startDate: Date,
  endDate: Date
}

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  postData: EventFormData = {
    description: '', startDate: new Date(Date.now()), endDate: new Date(Date.now())
  };

  editForm = new FormGroup({
    description: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required)
  });

  datePickerOptions: Pickadate.DateOptions = {
    monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],

    today: 'Hoje',
    clear: 'Limpar',
    close: 'Confirmar',

    labelMonthNext: 'Próximo mês',
    labelMonthPrev: 'Mês anterior',
    labelMonthSelect: 'Selecione o mês',
    labelYearSelect: 'Selecione o ano',

    format: 'dd/mm/yyyy',
    formatSubmit: 'yyyy:mm:dd'
  };

  timePickerOptions: Pickadate.TimeOptions = {
    twelvehour: false, 
    donetext: 'Confirmar', 
    cleartext: 'Limpar', 
    canceltext: 'Cancelar'
  };

  eventId: string;
  eventData: EventResult;

  constructor(private eventService: EventService, 
              private router: Router, 
              private toastService: MzToastService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.getEventData();
  }

  getEventData(){
    this.eventService.getEventById(this.eventId).subscribe((
      event => {
        this.eventData = event;
        this.putValuesInForm();
      }
    ))
  }

  putValuesInForm(){
    this.editForm.get('description').setValue(this.eventData.description);

    this.editForm.get('startTime').setValue(moment(this.eventData.startDate).format('HH:mm'));
    this.editForm.get('endTime').setValue(moment(this.eventData.endDate).format('HH:mm'));

    this.editForm.get('startDate').setValue(moment(this.eventData.startDate).format('YYYY:MM:DD'));
    this.editForm.get('endDate').setValue(moment(this.eventData.endDate).format('YYYY:MM:DD'));
  }

  checkFormValidity(): string {
    // start date time < end date time
    let start: moment.Moment = moment(
      this.editForm.get('startDate').value + ':' + this.editForm.get('startTime').value,
      'YYYY:MM:DD:HH:mm');

    let end: moment.Moment = moment(
      this.editForm.get('endDate').value + ':' + this.editForm.get('endTime').value,
      'YYYY:MM:DD:HH:mm');

    if (end.isBefore(start)) return 'O evento não pode acabar antes da data de início.'

    return null;
  }

  confirmEdit(){
    let validity = this.checkFormValidity();
    if (validity != null){
      this.toastService.show(validity, 4000, 'red');
      return;
    }

    // description
    this.eventData.description = this.editForm.get('description').value;

    // start date + time
    let startD: moment.Moment = moment(this.editForm.get('startDate').value, 'YYYY:MM:DD');
    let startT: moment.Moment = moment(this.editForm.get('startTime').value, 'HH:mm');
    this.eventData.startDate = new Date(startD.year(), startD.month(), startD.date(), startT.hour(), startT.minute(), 0, 0);
    console.log(this.eventData.startDate);

    // end date + time
    let endD: moment.Moment = moment(this.editForm.get('endDate').value, 'YYYY:MM:DD');
    let endT: moment.Moment = moment(this.editForm.get('endTime').value, 'HH:mm');
    this.eventData.endDate = new Date(endD.year(), endD.month(), endD.date(), endT.hour(), endT.minute(), 0, 0);
    console.log(this.eventData.endDate);

    this.eventService.editEvent(this.eventId, this.eventData).subscribe(
      () => {
        this.toastService.show('Evento editado!', 4000, 'green');
        this.router.navigateByUrl('/dashboard');
      },
      (err) => { 
        this.toastService.show('Aconteceu um erro durante a operação. Tente novamente.', 4000, 'red');
        console.error(err);
        this.router.navigateByUrl('/dashboard');
      }
    );
  }
}
