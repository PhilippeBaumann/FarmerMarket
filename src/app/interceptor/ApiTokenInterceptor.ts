import {Inject, Injectable} from '@angular/core';
import{
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import {from, Observable} from 'rxjs';

@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor {

    constructor(){}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'Content-Type'  :   'application/json, charset=utf-8',
                Accept          :   'application/json',
                Authorization   :   'Bearer nBHdWXo7apjzSdYovxIHN8EOio5DFA',
            },
        });
        return next.handle(req);
    }
}