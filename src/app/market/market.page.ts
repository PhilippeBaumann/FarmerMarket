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

  private url

  constructor(
    private router: Router,
    storage: Storage,
    private apiService: ApiService,
  ) {
    this.data = new DataCoreProvider(storage, apiService);
    this.url = this.apiService.getURL().replace('/api','');
    this.data.init();
  }

  ngOnInit() {
    
  }
  
  openDetails(id){
    this.router.navigate(['market/detail/' + id])
  }

  addToBag(id){
    console.log(id)
  }
}
