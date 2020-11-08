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

    public basket = []

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
                    this.storage.get('basket').then((data) =>{ this.basket = data })
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
            this.setProducts(this.vegetables)
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
    public async setProducts(vegetables: Vegetable[]) {
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

    // Basket Management

    public addToBasket(id) {
        // Load all products from the API
        this.api.getProducts().subscribe(results => {
            this.vegetables = results['data']            
            // Works Too -> this.basket.push(results['data'][id-1])
            // Get the current Basket and push the new product in it
            this.storage.get('basket').then(
            product => {
                if (product != null)                    
                    this.basket = product
                // Add the new product to the var basket (-1 = id to array index conversion)
                this.basket.push(this.vegetables[id-1])
                // Store the basket in the localstorage with the new product in it
                this.storage.set('basket',this.basket)
            })
        })       
    }

    public emptyBasket() {
        // Empty Basket Var
        this.basket = []
        // Delete Basket Entry
        this.storage.remove('basket')
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