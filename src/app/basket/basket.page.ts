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

  constructor(
    storage: Storage,
    private apiService: ApiService,
    private toastController: ToastController,) {
    this.data = new DataCoreProvider(storage, apiService)
    this.data.init()
  }

  ngOnInit() {
    /* Retrieve Old Orders
    this.apiService.getBasket().subscribe( 
      res =>{        
        this.baskets = res['data']
        console.log(this.baskets)
      })*/
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
