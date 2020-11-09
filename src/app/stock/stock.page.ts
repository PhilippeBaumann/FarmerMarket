import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})
export class StockPage implements OnInit {

  constructor(private apiService: ApiService, public toastController: ToastController) { }

  ngOnInit() {
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

  // Local Stock

  localstock = []

  exampleStock = [{ "id": 1, "quantity": 6.6}, { "id": 2, "quantity": 12}]

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

}
