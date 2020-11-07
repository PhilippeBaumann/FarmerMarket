import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.page.html',
  styleUrls: ['./balance.page.scss'],
})
export class BalancePage implements OnInit {

  private balance = {}

  constructor(
    private apiService: ApiService,
  ){}

  ngOnInit() {
    this.apiService.getBalance().subscribe( 
      res =>{
        this.balance = res
      })
  }

}
