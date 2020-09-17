import { DataCoreProvider } from './../../providers/dataprovider';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vegetable } from '../../models/vegetables';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements OnInit {

  public data: DataCoreProvider;

  private url = "http://vedjiz.mycpnv.ch/";

  constructor(
    private router: Router,
    storage: Storage,
    private http: HttpClient,
    private apiService: ApiService,
  ) {
    this.data = new DataCoreProvider(storage, http);
    this.data.init();
  }

  ngOnInit() {
    
  }

}
