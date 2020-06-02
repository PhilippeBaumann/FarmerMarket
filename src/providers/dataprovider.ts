import { Storage } from '@ionic/storage';
import {Data} from '@angular/router';
import {init} from 'protractor/built/launcher';
import { Vegetables } from '../models/vegetables';
import {ApiService} from '../app/services/api.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { resolve } from 'url';

@Injectable()


export class DataCoreProvider {

    public vegetables;
    public user;
    private api: ApiService;

    public url = 'http://localhost:8000/api/';
    
    public lastRefresh;

    constructor(private storage: Storage, private http: HttpClient){ }

    init() {

        
        this.user = [];
        this.vegetables = [];

        // Load data via the local storage
        //this.loadStorage();

        this.getFromAPI();

        /*
        this.vegetables.push(new Vegetables('Poivnichon Bio 3000', 'troubabaobob', 1, 30, 'choupommeau', 30.90 ));
        this.vegetables.push(new Vegetables('Le BOB', 'troubabaobob LE', 2, 30, 'choupommeau', 32.00 ));
  
        this.storage.set('FarmerMarket', this.vegetables);

        
        console.log('Data successfully inserted');
        */
    }
  
    public store() {

    }

    
    public loadStorage() {
        this.storage.ready().then(() => {
            this.storage.get('products').then((data) => {
                this.vegetables = data;
                // checking for values in the storage if non Load it From the API
                if (this.storage === null) {
                    console.log('Data Storage Empty');
                    // Load assets via the API service
                    this.getFromAPI();
                    console.log('Data Storage filled From API');
                } else {
                    console.log('Data successfully loaded');
                }
                this.lastRefresh = new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString();
            });
        });
    }

    
    // Access the API trough a specific Path and Load the result Into the object Collection
    public getFromAPI(): Promise<any> {
        return new Promise<any>( (resolve, reject) => {
            this.http.get<Vegetables[]>(this.url + 'products').subscribe(results => {
                console.log(results)
                this.vegetables = results['data']
                this.setVegetables(this.vegetables)
            });
        })
        
    }
    

    // Insert the vegetables Into the local storage
    public async setVegetables(vegetables: Vegetables[]) {
        this.storage.set('products', vegetables)
    }

    public find(id) {
        return new Promise<any>( (resolve, reject) => {
            this.vegetables.forEach((ved) => {
                if (ved.id = id) resolve(ved)
            })
            reject('Product:  ' + id + 'not found')
        })
    }
}