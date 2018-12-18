import { Component } from '@angular/core';
import { MzToastService } from 'ngx-materialize';

import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { EventService, CreateEventFormData } from '../event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  postData: CreateEventFormData = {
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
    this.postData.description = this.createForm.get('description').value;

    // start date + time
    let startD = this.createForm.get('startDate').value.split(':');
    let startT = this.createForm.get('startTime').value.split(':');
    this.postData.startDate = new Date(startD[0]-1, startD[1], startD[2], startT[0], startT[1], 0, 0);
    console.log(this.postData.startDate);

    // end date + time
    let endD = this.createForm.get('endDate').value.split(':');
    let endT = this.createForm.get('endTime').value.split(':');
    this.postData.endDate = new Date(endD[0]-1, endD[1], endD[2], endT[0], endT[1], 0, 0);
    console.log(this.postData.endDate);

    this.eventService.createEvent(this.postData).subscribe(
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
