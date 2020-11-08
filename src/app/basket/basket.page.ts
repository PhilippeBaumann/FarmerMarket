import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DataCoreProvider } from 'src/providers/dataprovider';
import { Storage } from '@ionic/storage';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
})
export class BasketPage implements OnInit {  

  public data: DataCoreProvider

  localBasket = []

  // Simply set the id as parameter to retrive the restof the information needed for displaying
  simpleBasket = []

  exampleBasket = [{"product_id": "1","quantity": "99"},{"product_id": "3","quantity": "1"}]

  result = []

  // Control Declarations
  public quantity = []

  private totalAmount = 0

  constructor(
    storage: Storage,
    private apiService: ApiService,
    private toastController: ToastController,) {
    this.data = new DataCoreProvider(storage, apiService)
    this.data.init()
  }

  async ngOnInit() {
    /* Retrieve Old Orders
    this.apiService.getBasket().subscribe( 
      res =>{        
        this.baskets = res['data']
        console.log(this.baskets)
      })*/

      this.localBasket = await this.data.getBasket()
      console.log(this.localBasket)
      console.log(this.data.basket)

      var product = new Set(this.localBasket.map(item => item.id))
      product.forEach(getID => 
        this.result.push({
          product_id: getID, 
          values: this.localBasket.filter(i => i.id === getID)
        })        
      )

      console.log(this.result)

      this.updateBasketValue()
  }

  removeItem(id){
    console.log(id);
  }

  updateProductQuantity(productID){
    console.log(this.simpleBasket)
    console.log(productID)
    console.log(this.quantity[productID])
    this.updateBasketValue()
  }

  updateBasketValue(){
    this.totalAmount = this.localBasket.reduce((sum, current) => sum + current.price, 0).toFixed(2)
  }

  emptyBasket(){
    this.data.emptyBasket()
  }

  validateBasket(){
    console.log("Purchase Basket")
    this.apiService.purchaseBasket(this.exampleBasket).subscribe(data =>
      {
        console.log(data)
      }, error =>
      {
        // Prompt User that the inscription has failed and show him what went wrong (uf?)
        console.log(error)
               
      }, () => {
        // Prompt User that the inscription has been accepted
        console.log('Purchase Successful', 'bottom')
      })
  }

}
