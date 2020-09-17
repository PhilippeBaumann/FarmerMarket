import { Storage } from '@ionic/storage';
import {Data} from '@angular/router';
import {init} from 'protractor/built/launcher';
import {ApiService} from '../app/services/api.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { resolve } from 'url';

// Models Import
import { Vegetable } from '../models/vegetables';
import { User } from 'src/models/users';

@Injectable()


export class DataCoreProvider {

    public vegetables;
    public user;
    private api: ApiService;

    public url = 'http://vedjiz.mycpnv.ch/api/';
    
    public lastRefresh;

    constructor(private storage: Storage, private http: HttpClient){ }

    init() {

        
        this.user = []
        this.vegetables = []

        // Load data via the local storage
        // this.loadStorage();

        this.getFromAPI()

        /*       
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
            this.http.get<Vegetable[]>(this.url + 'products').subscribe(results => {
                console.log(results)
                this.vegetables = results['data']
                this.setVegetables(this.vegetables)
            });
            this.http.get<User[]>(this.url + 'me').subscribe(results => {
                console.log(results)
                this.user = results['data']
                this.setUser(this.user)
            });
        })        
    }
    

    // Insert the vegetables Into the local storage
    public async setVegetables(vegetables: Vegetable[]) {
        this.storage.set('products', vegetables)
    }

    // Insert the user values into the local storage
    public async setUser(user: User[]) {
        this.storage.set('user', user)
    }

    // Insert the token into the local storage
    public async setToken(token) {
        this.storage.set('token', token)
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