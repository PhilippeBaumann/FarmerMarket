import { Storage } from '@ionic/storage';
import {ApiService} from '../app/services/api.service';
import {Injectable} from '@angular/core';

// Models Import
import { Vegetable } from '../models/vegetables';
import { User } from 'src/models/users';

@Injectable()


export class DataCoreProvider {

    public vegetables = []
    public user = []
    public balance = []

    public lastRefresh;

    constructor(private storage: Storage, public api: ApiService){ }

    init() {        

        // Load data via the local storage
        this.loadStorage();

        // Loads everything from the API not just specific fields or data
        //this.getAPIdata()
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
                    this.storage.get('balance').then((data) =>{ this.balance = data })
                    console.log('Data successfully loaded from localstorage')
                }   
                this.lastRefresh = new Date().toLocaleDateString() /* + ' ' + new Date().toLocaleTimeString() */
            })
        })
    }

    
    // Access the API trough a specific Path and Load the result Into the object Collection
    private getAPIdata() {        
        this.getAndSaveProductsDataFromAPI()
        this.getAndSaveUserDataFromAPI()
        this.getAndSaveBalanceDataFromAPI()
    }

    public getAndSaveUserDataFromAPI(){
        this.api.getUser().subscribe(results => {
            this.user = results['data']
            this.setUser(this.user)
        })
    }
    
    public getAndSaveProductsDataFromAPI(){
        this.api.getProducts().subscribe(results => {
            this.vegetables = results['data']
            this.setVegetables(this.vegetables)
        });
    }

    public getAndSaveBalanceDataFromAPI() {
        this.api.getBalance().subscribe(
        res => {
            this.balance = res['data']
            this.storage.set('balance', res)
        }, err => {
            // Could be a toast message
            console.log("Balance error")
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
    public setToken(token) {
        this.storage.set('token', token)
    }

    // Retrive token from the local storage
    public async getToken() {
        await this.storage.ready()
        return await this.storage.get('token')
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