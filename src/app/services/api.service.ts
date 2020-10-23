import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vegetable } from 'src/models/vegetables';
import { User } from 'src/models/users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Prefixed API URL
  private url = 'http://localhost:8000/api/';
  //public url = 'http://vedjiz.mycpnv.ch/api/';

  private header = {}

  private requestOptions = {}
  
  constructor(private http: HttpClient) {}


  // Setters

  public updateToken(token){

    this.header = {
      'Content-Type': 'application/json, charset=utf-8',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
      }
      
    this.requestOptions = {
      headers: new HttpHeaders(this.header),
    }
  }

  // Get Requests

  getURL(){
    return this.url
  }

  getProducts(){
    return this.http.get<Vegetable[]>(this.url + "products", this.requestOptions)
  }

  getUser(){
    return this.http.get<User[]>(this.url + "me", this.requestOptions)
  }

  checkToken(token){
    this.updateToken(token)
    console.log(this.requestOptions)
    return this.http.get(this.url + "me", this.requestOptions)
  }

  // Post Requests

  registerUser(firstname, lastname, phonenumber) {
    let postData = {
        "firstname": firstname,
        "lastname": lastname,
        "phonenumber": phonenumber
    }
    return this.http.post(this.url + "user/apply", postData)
  }
}
