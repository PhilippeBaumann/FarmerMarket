import { Storage } from '@ionic/storage';
import {Data} from '@angular/router';
import {init} from 'protractor/built/launcher';
import { Vegetables } from '../models/vegetables';
import {ApiService , SearchType} from '../app/services/api.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()

export class DatacoreProvider {

    // Prefixed API URL
    url = 'http://localhost:8000/api/products/';

    public vegetables;

    private storage: Storage;

    results: Observable<any>;
    type: SearchType = SearchType.all;
    public lastRefresh;

    constructor(storage: Storage, private apiServer: ApiService, private http: HttpClient) {
        this.storage = storage;
    }

    init() {

        // Load vegetables via the local storage
        this.loadStorage();

        this.vegetables = [];

        this.storage.set('vegetables', this.vegetables);
    }

    public store() {

    }

    public loadStorage() {
        this.storage.ready().then(() => {
            this.storage.get('assets').then((data) => {
                this.vegetables = data;
                // checking for values in the storage if non Load it From the API
                if (this.getDataAPI === null) {
                    console.log('Data Storage Empty');
                    // Load assets via the API service
                    this.getDataAPI();
                    console.log('Data Storage filled From API');
                } else {
                    console.log('Data successfully loaded');
                }
                this.lastRefresh = new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString();
            });
        });
    }

    // Access the API trough a specific Path and Load the result Into a Vegetables object Collection
    public getDataAPI() {
        this.http.get<Vegetables[]>(this.url + 'vegetables')
            .subscribe(results => {
                const vegetables = results['data'];
                this.setVegetables(vegetables);
            });
    }

    // Insert the vegetables Into the local storage
    public async setVegetables(vegetables: Vegetables[]) {
        this.storage.set('vegetables', vegetables);
    }
}