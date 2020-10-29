import {Inject, Injectable} from '@angular/core';
import{
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import { DataCoreProvider } from 'src/providers/dataprovider';

@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor {  

    constructor(public data: DataCoreProvider) {}

    public intercept(
        req:HttpRequest<any>,
        next:HttpHandler
    ): Observable<HttpEvent<any>> {        
            req = req.clone({
                setHeaders: {
                    'Content-Type'  :   'application/json, charset=utf-8',
                    Accept          :   'application/json',
                    Authorization   :   'Bearer ' + this.data.token,  // nBHdWXo7apjzSdYovxIHN8EOio5DFA
                },
            });        
        return next.handle(req);
    }
}