import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { DataCoreProvider } from 'src/providers/dataprovider';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public data: DataCoreProvider;
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Market',
      url: '/market',
      icon: 'basket'
    },
    {
      title: 'My Balance',
      url: '/balance',
      icon: 'wallet'    
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'cog'
    },
  ];  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    storage: Storage,
    private http: HttpClient,
    private apiService: ApiService,
  ) {
    this.initializeApp();
    this.data = new DataCoreProvider(storage, http);
    this.data.init();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
  }
}
