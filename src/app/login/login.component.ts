import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  apiUrl = "http://www.hindustansoft.net:8010/api/v1/Auth/";
  email: string = "";
  password: string = "";
  constructor(private http: HttpClient,
    private router: Router) { }

  ngOnInit() {

  }

  signIn() {
    return this.http.post<any>(`${this.apiUrl}` + 'Login', {
      "email": this.email,
      "password": this.password,
      "isRemember": true,
      "token": "ad veniam elit sit"
    }).subscribe({
      next: data => {
        console.log(data)
        localStorage.setItem("token", data.token)
        this.router.navigateByUrl('home');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
}
