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
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable()


export class DataCoreProvider {

    public vegetables = [];
    public user = [];

    private url;

    public lastRefresh;

    public token;

    constructor(private storage: Storage, private http: HttpClient, public api: ApiService){ }

    init() {

        // Get the current API URL from the ApiService Module
        this.url = this.api.getURL()        

        // Load data via the local storage
        this.loadStorage();

        // Loads everything from the API not just specific fields or data
        //this.getFromAPI()
    }
  
    public store() {

    }

    
    public loadStorage() {
        this.storage.ready().then(() => {            
            // If the storage is empty load the values from the API
            this.storage.get('user').then((data) => {
                if (data == undefined){
                    console.log('Data Storage Empty')
                    // Load assets via the API
                    this.getAPIdata();
                    console.log('Data Storage filled From API')
                } else {                
                    this.storage.get('products').then((data) =>{ this.vegetables = data })
                    this.storage.get('user').then((data) =>{ this.user = data })
                    console.log('Data successfully loaded from localstorage')
                }   
                this.lastRefresh = new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString()
            })
        })
    }

    
    // Access the API trough a specific Path and Load the result Into the object Collection
    private getAPIdata() {        
        this.api.getProducts().subscribe(results => {
            console.log(results)
            this.vegetables = results['data']
            this.setVegetables(this.vegetables)
        });
        this.api.getUser().subscribe(results => {
            console.log(results)
            this.user = results['data']
            this.setUser(this.user)
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

    // Retrive token from the local storage
    public getToken() {
        this.storage.ready().then(() => {      
            this.storage.get('token').then((val) => {
                this.token =  val
            })
        })
        return this.token
    }

    // Delete the token from the the storage
    public deleteToken(){
        this.storage.remove('token')
    }

    public deleteStorage(){
        this.storage.clear()
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