import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  APIUrl = 'http://localhost:3000';

  // Declare empty list of people
  people: Object[] = [];

  constructor(private http: HttpClient) {}

  // Angular 2 Life Cycle event when component has been initialized
  ngOnInit() {
    /*this.addPerson('teste4', '44');
    this.getAllPeople();*/
  }

  // Add one person to the API
  addPerson(name, age) {
    this.http.post(this.APIUrl + '/users', {'name': name, 'age': age})
      .subscribe(
        (response) => { console.log('response: ' + response) },
        (error) => { console.log('error: ' + error)}
      )
  }

  getAllPeople(){
    this.http.get(this.APIUrl + '/users')
      .subscribe((response) => {
        console.log(response);
      });
  }

  // Get all users from the API
  /*getAllPeople() {
    this.http.get(`${this.API}/users`)
      .map(res => res.json())
      .subscribe(people => {
        console.log(people)
        this.people = people
      })
  }*/
}
