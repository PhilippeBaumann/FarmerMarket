import { Component, OnInit } from '@angular/core';
import { DataCoreProvider } from 'src/providers/dataprovider';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  // Try to access already initialized data or refresh it
  public data: DataCoreProvider;
  
  constructor(
    private router: Router,
    storage: Storage,
    private http: HttpClient,
    private apiService: ApiService,
  ) {
    this.data = new DataCoreProvider(storage, http, apiService)
    this.data.init()
  }

  ngOnInit() {
  }

  logout(){
    this.data.deleteToken()
    //this.data.deleteStorage()
    this.router.navigate(['login'])
  }
}
