import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataCoreProvider } from 'src/providers/dataprovider';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // Toasts
  async presentToast(message, position) {
    const toast = await this.toastController.create({
      message: message,
      position: position,
      duration: 3000
    });
    toast.present();
  }

  // Menu Sidebar Controls
  public menu: MenuController

  // Registration Form Validation
  registrationForm = this.formBuilder.group({
    firstname: ["", [Validators.required, Validators.minLength(2)]],
    lastname: ["", [Validators.required, Validators.minLength(2)]],
    phone: ["", [Validators.required, Validators.minLength(9), Validators.pattern('[0][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]')]],
  })

  get firstname() {
    return this.registrationForm.get('firstname')
  }

  get lastname() {
    return this.registrationForm.get('lastname')
  }

  get phone() {
    return this.registrationForm.get('phone')
  }
  
  // Token Form Validation
  tokenForm = this.formBuilder.group({
    token: ["", [Validators.required, Validators.minLength(60)]]
  })

  get token() {
    return this.tokenForm.get('token')
  } 

  constructor(private router: Router, private storage: Storage, public menuCtrl: MenuController, private apiService: ApiService, public data: DataCoreProvider, private formBuilder: FormBuilder, public toastController: ToastController) {
  }

  ngOnInit() {

    

    // Check if the token is available in the storage
    this.storage.get('token').then((val) => {
      if (val != undefined) {
        // Update token for next API requests (optional)
        this.apiService.updateToken(val)

        // API Request to test if the connection is still valid
        this.apiService.checkToken(val).subscribe(data =>{},
          error =>
          {
            // Prompt User that the token or the API is invalid
            this.presentToast('Could not establish connection to the API', 'middle')
          }, () =>
          {
            // Populate storage with user data from the API
            this.data.getAndSaveUserDataFromAPI()
            this.router.navigate(['settings'])
          })
      }
      else {
        this.menuCtrl.enable(false)
      }
    })
  }

  signup(){

    // Text Control
    console.log(this.registrationForm.value['firstname'])
    console.log(this.registrationForm.value['lastname'])
    console.log(this.registrationForm.value['phone'])   

    // API request to create a new user
    this.apiService.registerUser(this.registrationForm.value['firstname'], this.registrationForm.value['lastname'], this.registrationForm.value['phone']).subscribe(data =>
      {
        console.log(data)
      }, error =>
      {
        // Prompt User that the inscription has failed and show him what went wrong (uf?)
        if (error['error'] ==  '[object ProgressEvent]') {
          this.presentToast('Could not establish connection to the API', 'middle')
        } else {
          this.presentToast('The following error ocurred: ' + error['error'], 'bottom')
        }        
      }, () => {
        // Prompt User that the inscription has been accepted
        this.presentToast('Registration Successful', 'bottom')
      })
  }  

  login(){

    // Put the token in the local storage so the API service can check if it is valid
    //this.data.setToken(this.tokenForm.value['token'])

    // API Request to test Token validity
    this.apiService.checkToken(this.tokenForm.value['token']).subscribe(data =>
      {
        console.log(data)
      }, error =>
      {
        // Prompt User that the token or the API is invalid
        if (error['error'] ==  '[object ProgressEvent]') {
          this.presentToast('Could not establish connection to the API', 'middle')
        } else {
          this.presentToast('Invalid Token', 'bottom' /* + error['error']['message']*/)
          console.log(error)
        }
        // Delete the invalid token
        this.data.deleteToken()
      }, () => {
        // Prompt User that the inscription has been accepted
        this.presentToast('Login Successful', 'bottom')
        // Put the token in the local storage
        this.data.setToken(this.tokenForm.value['token'])
        // Reenable the side-menu
        this.menuCtrl.enable(true)
        // Populate storage with data from the API
        this.data.init()
        // Navigate to "UserSettings"
        this.router.navigate(['settings'])
      })    
  }
  
  // Validation Messages
  validation_messages = {
    'name': [
      { type: 'required', message: 'This field is required.' },
      { type: 'minlength', message: 'This field must be at least 2 characters long.' },
      //{ type: 'pattern', message: 'This field must contain only letters.' },
    ],
    'phone': [
      { type: 'required', message: 'A phone number is required.' },
      { type: 'minlength', message: 'This field must be at least 9 characters long.' },
      { type: 'pattern', message: 'This field must contain a valid phone number.' },
    ],
    'token': [
      { type: 'required', message: 'A token is required.' },
      { type: 'minlength', message: 'Token must be 60 characters long.' },
    ],
    }
}
