import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { DataCoreProvider } from './../../providers/dataprovider';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})
export class StockPage implements OnInit {  

  constructor(private apiService: ApiService, public toastController: ToastController, storage: Storage,) {
    this.data = new DataCoreProvider(storage, apiService)
    this.url = this.apiService.getURL().replace('/api','')
  }

  ngOnInit() {
    this.apiService.getProducts().subscribe(results => {
      this.localstock = results['data']
    });
  }

  // Toast
  async presentToast(message, position) {
    const toast = await this.toastController.create({
      message: message,
      position: position,
      duration: 3000
    });
    toast.present();
  }

  // Local Stock Variables

  localstock = []

  exampleStock = [{ "id": 1, "quantity": 6.6}, { "id": 2, "quantity": 12}]

  validated: boolean;

  url: string;

  public data: DataCoreProvider;

  // Load Stock


  // Stock Validation
  validateStock(){
    console.log("Validate Stock")
    this.apiService.validateStock(this.exampleStock).subscribe(data =>
      {
        console.log(data)
      }, error =>
      {
        // Prompt User that the stock validation has failed and show him the error
        this.presentToast('Stock Validation Unsuccessful! Error:' + error, 'bottom')
               
      }, () => {
        // Prompt User that the stock validation has been successful
        this.presentToast('Stock Validation Successful', 'bottom')
      })
  }

  // Reset Validation

  restartValidation(){
    console.log('restart')
    this.validated = false
  }

}
