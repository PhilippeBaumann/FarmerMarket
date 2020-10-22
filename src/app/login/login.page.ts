import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataCoreProvider } from 'src/providers/dataprovider';
import { Storage } from '@ionic/storage';

import {  MenuController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  public menu: MenuController

  // To not crash on startup, declaring textfiled values
  private firstnameInput
  private lastnameInput
  private phoneInput

  private tokenInput

  constructor(private router: Router, private storage: Storage, public menuCtrl: MenuController, private apiService: ApiService, public data: DataCoreProvider) {
  }

  ngOnInit() {

    // CHECK WHY THE GET TOKEN FUNCTION IN Data IS NOT WORKING !!
    // Check if the token is available in the storage
    this.storage.get('token').then((val) => {
      if (val != undefined) {      
        this.router.navigate(['market'])
      }
      else{
        this.menuCtrl.enable(false)
      }
    })    
  }

  signup(){
    console.log(this.firstnameInput)
    console.log(this.lastnameInput)
    console.log(this.phoneInput)

    // API request to create a new user

    this.apiService.registerUser(this.firstnameInput, this.lastnameInput, this.phoneInput)

  }  

  login(){
    this.data.setToken(this.tokenInput) // Put the token in the local storage
    this.menuCtrl.enable(true) // Reenable the side-menu
    this.router.navigate(['market']) // Navigate to homepage
  }
}
