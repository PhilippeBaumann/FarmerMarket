import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DataCoreProvider } from 'src/providers/dataprovider';
import { Storage } from '@ionic/storage';
import { ApiService } from '../services/api.service';
import { FORMERR } from 'dns';
import { groupBy } from 'rxjs/operators';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
})
export class BasketPage implements OnInit {  

  public data: DataCoreProvider

  localBasket = []

  result = []

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
  }

  removeItem(id){
    console.log(id);
  }

  updateBasketValue(){
    this.data.basket.filter(product => product.price).reduce((sum, current) => sum + current.total, 0)
  }

  emptyBasket(){
    this.data.emptyBasket()
  }

  validateBasket(){
    
  }

}
