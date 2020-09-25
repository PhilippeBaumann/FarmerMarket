import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  signup(){
    console.log(this.firstnameInput);
    console.log(this.lastnameInput);
    console.log(this.phoneInput);

    // API request to create a new user

    

  }

  login(){
    console.log(this.tokenInput);
  }

}
