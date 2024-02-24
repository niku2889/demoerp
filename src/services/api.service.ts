import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    apiUrl = "http://www.hindustansoft.net:8010/api/v1/Auth/"
    constructor(private http: HttpClient) { }

    // Sign in with email/password
    signIn(email: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}` + 'Login', {
            "email": "demo",
            "password": "12345",
            "isRemember": true,
            "token": "ad veniam elit sit"
        });
    }

    // get all product details
    getAllProduct(email: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}` + 'GetAllProduct', {
            "email": "demo",
            "password": "12345",
            "isRemember": true,
            "token": "ad veniam elit sit"
        });
    }

}