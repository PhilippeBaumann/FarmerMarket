import { DataCoreProvider } from './../../providers/dataprovider';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Storage } from '@ionic/storage';
import { Vegetable } from '../../models/vegetables';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements OnInit {

  public data: DataCoreProvider;

  product = {}

  private url

  constructor(
    private router: Router,
    storage: Storage,
    private apiService: ApiService,
  ) {
    this.data = new DataCoreProvider(storage, apiService);
    this.url = this.apiService.getURL().replace('/api','');
    this.data.getAndSaveProductsDataFromAPI()
  }

  ngOnInit() {}
  
  openDetails(id){
    this.apiService.getProduct(id).subscribe(results => {
      this.product = results['data']
      console.log(this.product)
      let navExtras: NavigationExtras = {
        state: {
          product: this.product
        }
      }
      this.router.navigate(['market/detail'], navExtras)
    }, error =>
    {
      console.log(error)
      console.log('error')
    })    
  }

  addToBag(id){
    console.log(id)
  }
}
