import { Vegetable } from './../../models/vegetables';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/models/users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {  

  // Prefixed API URL
  private url = 'http://localhost:8000/api/';
  //public url = 'http://vedjiz.mycpnv.ch/api/';

  header = {}
    
  requestOptions = {}

  public token
  
  constructor(private http : HttpClient) {}


  /* Setters

  public updateToken(){

    this.getToken()

    this.header = {
      'Content-Type': 'application/json, charset=utf-8',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.token
      }
      
    this.requestOptions = {
      headers: new HttpHeaders(this.header),
    }
  }

  public testToken(token){

    this.header = {
      'Content-Type': 'application/json, charset=utf-8',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
      }
      
    this.requestOptions = {
      headers: new HttpHeaders(this.header),
    }
  }

  /* Get Custom Header

  getHeader(){
    
    let headerTemp = {
      'Content-Type': 'application/json, charset=utf-8',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    }
      
    let requestOptionsTemp = {
      headers: new HttpHeaders(headerTemp),
    }

    return requestOptionsTemp
  }  

  /* Retrive token from the local storage
  getToken() {
    this.storage.ready().then(() => {      
        this.storage.get('token').then((token) => {
            this.token = token 
        })
    })
    return this.token
  }*/


  // Get Requests

  getURL(){
    return this.url
  }

  getProducts(){
    return this.http.get<Vegetable[]>(this.url + "products")
  }

  getProduct(id){
    return this.http.get(this.url + "products/" + id)
  }

  getUser(){
    return this.http.get(this.url + "me")
  }

  getBalance(){
    return this.http.get(this.url + "me/balance")
  }
  
  getBasket() {
    return this.http.get(this.url + "baskets")
  }

  checkToken(){
    return this.http.get(this.url + "me")
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
