import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataCoreProvider } from 'src/providers/dataprovider';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public product
  public url
  //public data: DataCoreProvider

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
    this.url = this.apiService.getURL().replace('/api','');
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.product = this.router.getCurrentNavigation().extras.state.product
        console.log(this.router.getCurrentNavigation().extras.state)
      }
    })
    //this.data = new DataCoreProvider(storage, apiService);
    //this.data.init();
  }
  
  ngOnInit() {
    
  }

  addToBag(id){
    console.log(id)
  }

}
