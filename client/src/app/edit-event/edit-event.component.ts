import { Component, OnInit } from '@angular/core';
import { MzToastService } from 'ngx-materialize';

import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { EventService } from '../event.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  editForm = new FormGroup({
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
  };

  timePickerOptions: Pickadate.TimeOptions = {
    twelvehour: false, 
    donetext: 'Confirmar', 
    cleartext: 'Limpar', 
    canceltext: 'Cancelar'
  };

  constructor(private eventService: EventService, private router: Router, private toastService: MzToastService) { }

  ngOnInit() {
  }

}
