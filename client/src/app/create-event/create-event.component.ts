import { Component } from '@angular/core';
import { MzToastService } from 'ngx-materialize';

import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { EventService, EventFormData } from '../event.service';

import * as moment from 'moment';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  eventData: EventFormData = {
    description: '', startDate: new Date(Date.now()), endDate: new Date(Date.now())
  };

  createForm = new FormGroup({
    description: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    startTime: new FormControl(),
    endTime: new FormControl()
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
  }

  timePickerOptions: Pickadate.TimeOptions = {
    twelvehour: false, 
    donetext: 'Confirmar', 
    cleartext: 'Limpar', 
    canceltext: 'Cancelar'
  }

  constructor(private eventService: EventService, private router: Router, private toastService: MzToastService) {
    
  }

  submitForm(){
    console.log("form submitted");

    // description
    this.eventData.description = this.createForm.get('description').value;

    // start date + time
    let startD: moment.Moment = moment(this.createForm.get('startDate').value, 'YYYY:MM:DD');
    let startT: moment.Moment = moment(this.createForm.get('startTime').value, 'HH:mm');
    this.eventData.startDate = new Date(startD.year(), startD.month(), startD.date(), startT.hour(), startT.minute(), 0, 0);
    console.log(this.eventData.startDate);

    // end date + time
    let endD: moment.Moment = moment(this.createForm.get('endDate').value, 'YYYY:MM:DD');
    let endT: moment.Moment = moment(this.createForm.get('endTime').value, 'HH:mm');
    this.eventData.endDate = new Date(endD.year(), endD.month(), endD.date(), endT.hour(), endT.minute(), 0, 0);
    console.log(this.eventData.endDate);

    console.log('start date: ' + startD.year() + ' ' + startD.month() + ' ' + startD.date() + ' ' + startT.hour() + ' ' + startT.minute());
    console.log('end date: ' + endD.year() + ' ' + endD.month() + ' ' + endD.date() + ' ' + endT.hour() + ' ' + endT.minute());

    this.eventService.createEvent(this.eventData).subscribe(
      () => {
        this.toastService.show('Evento cadastrado!', 4000, 'green');
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
