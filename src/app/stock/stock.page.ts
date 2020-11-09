import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { DataCoreProvider } from './../../providers/dataprovider';
import { Storage } from '@ionic/storage';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

    // Load Stock
    this.apiService.getProducts().subscribe(results => {
      this.localstock = results['data']
      this.displayedProduct = this.localstock[this.index]
    })
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

  newStock = []

  displayedProduct = []

  index = 0

  exampleStock = [{ "id": 1, "quantity": 6.6}, { "id": 2, "quantity": 12}]

  validated: boolean

  url: string

  public data: DataCoreProvider

  public quantity = []

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
        this.presentToast('Les quantités ont été enregistrées', 'bottom')
      })
  }

  // Reset Validation

  restartValidation(){
    console.log('restart')
    this.validated = false
  }

  // Validate Product

  validateProduct(){
    console.log(this.localstock)
    this.newStock.push(this.localstock[this.index])
    delete this.localstock[this.index]
    console.log(this.newStock)
    console.log(this.exampleStock)
    console.log(this.localstock.length)
    if (this.localstock.length <=  1) {
      this.validated = true
    }else {
      this.next()
    }
    
  }

  // Controls

  next(){
    if(this.index >= 0 && this.index < this.localstock.length -1){
      this.index += 1      
    }else{
      this.index = 0
    }
    this.displayedProduct = this.localstock[this.index]
  }

  back(){
    if(this.index >= 1 && this.index < this.localstock.length){
      this.index -= 1
    }else {
      this.index = this.localstock.length - 1
    }
    this.displayedProduct = this.localstock[this.index]
  }

  updateProductQuantity(productID){
    this.localstock[this.index].stock = this.quantity[productID]
  }

}
