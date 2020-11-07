import { Component, OnInit } from '@angular/core';
import { DataCoreProvider } from 'src/providers/dataprovider';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {



  // Try to access already initialized data or refresh it
  public data: DataCoreProvider  
  
  constructor(
    private router: Router,
    storage: Storage,
    private apiService: ApiService,
    private toastController: ToastController,
  ){
      this.data = new DataCoreProvider(storage, apiService)
      this.data.init()
  }
    
  ngOnInit() {
  }
  
  // Advanced Toast
  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Are you sure?',
      message: 'all local data will be lost',
      color: 'danger',
      position: 'bottom',
      buttons: [
        {
          side: 'start',
          icon: 'checkmark',
          handler: () => {
            this.logout()
          }
        }, {
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  logout(){
    //this.data.deleteToken()
    this.data.deleteStorage()
    // Clean the current view and set values
    this.router.dispose()
    // Show the Welcome page again
    this.router.navigate(['login'])
  }
}
