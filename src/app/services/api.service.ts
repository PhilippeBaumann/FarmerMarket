import { Data } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Prefixed API URL
  private url = 'http://localhost:8000/api/';
  //public url = 'http://vedjiz.mycpnv.ch/api/';

  //constructor(private apiServer: ApiService, private http: HttpClient) {
  constructor(private http: HttpClient) {
      
  }

  getURL(){
    return this.url
  }

  getProducts(){
    return this.http.get(this.url + "products")
  }

  getUser(){
    return this.http.get(this.url + "me")
  }

  registerUser(firstname, lastname, phonenumber) { 
    let postData = {
        "firstname": firstname,
        "lastname": lastname,
        "phonenumber": phonenumber
    }
    return this.http.post(this.url + "user/apply", postData)
  }
}
