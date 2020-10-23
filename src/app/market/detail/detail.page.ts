import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataCoreProvider } from 'src/providers/dataprovider';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  product
  public url
  //public data: DataCoreProvider

  constructor(private route: ActivatedRoute, storage: Storage, private apiService: ApiService) {
    this.url = this.apiService.getURL().replace('/api','');
    //this.data = new DataCoreProvider(storage, apiService);
    //this.data.init();
  }
  
  ngOnInit() {
    this.apiService.updateToken()
    this.apiService.getProduct(this.route.snapshot.paramMap.get('id')).subscribe(results => {
      this.product = results['data']
    }, error =>
    {
      console.log(error)
    })
  }

}
