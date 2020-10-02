import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataCoreProvider } from 'src/providers/dataprovider';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public data: DataCoreProvider;

  // To not crash on startup
  private firstnameInput
  private lastnameInput
  private phoneInput

  private tokenInput

  constructor(private router: Router, storage: Storage, private http: HttpClient) {
    this.data = new DataCoreProvider(storage, http)
    this.data.init()
  }

  ngOnInit() {
  }

  signup(){
    console.log(this.firstnameInput)
    console.log(this.lastnameInput)
    console.log(this.phoneInput)

    // API request to create a new user

    

  }  

  login(){
    this.data.setToken(this.tokenInput) // Put the token in the local storage
    this.router.navigate(['market']); // Navigate to homepage
  }

}
