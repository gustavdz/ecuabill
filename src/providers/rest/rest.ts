import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

    apiUrl = 'http://192.168.137.16:8000/api';

    constructor(public http: HttpClient) {
        console.log('Hello RestProvider Provider');
    }
    getProducts() {
        return new Promise((resolve,reject)=> {
            this.http.get(this.apiUrl + '/products', {
                headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', localStorage.getItem("api_token")),
            }).subscribe(data => {
                resolve(data);
            }, (err: HttpErrorResponse) => {
                console.log('ERROR!: ', err.message);
                console.log('status', err.status);
                reject(err);
            });
        });
    }


    getClients() {
        return new Promise((resolve,reject)=> {
            this.http.get(this.apiUrl + '/clients', {
                headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', localStorage.getItem("api_token")),
            }).subscribe(data => {
                resolve(data);
            }, (err: HttpErrorResponse) => {
                console.log('ERROR!: ', err.message);
                console.log('status', err.status);
                reject(err);
            });
        });
    }

    addClient(data){
        return new Promise((resolve, reject) => {
            this.http.post(this.apiUrl+'/clients', JSON.stringify(data),{
                headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', localStorage.getItem("api_token")),
            }).subscribe(res => {
                resolve(res);
            }, (err: HttpErrorResponse) => {
                console.log('ERROR!: ', err.message);
                console.log('status', err.status);
                reject(err);
            });
        });
    }

    addProduct(data){
        return new Promise((resolve, reject) => {
            this.http.post(this.apiUrl+'/products', JSON.stringify(data),{
                headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', localStorage.getItem("api_token")),
            }).subscribe(res => {
                resolve(res);
            }, (err: HttpErrorResponse) => {
                console.log('ERROR!: ', err.message);
                console.log('status', err.status);
                reject(err);
            });
        });
    }

    addUser(data) {
        return new Promise((resolve, reject) => {
            this.http.post(this.apiUrl+'/register', JSON.stringify(data),{

            }).subscribe(res => {
                resolve(res);
            }, (err: HttpErrorResponse) => {
                console.log('ERROR!: ', err.message);
                console.log('status', err.status);
                reject(err);
            });
        });
    }

    login(data){
        console.log(JSON.stringify(data));
        return new Promise((resolve, reject) => {
            this.http.post(this.apiUrl+'/login', JSON.stringify(data),{
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                //params: new HttpParams().set('',''),
            }).subscribe(res => {
                resolve(res);
            }, (err: HttpErrorResponse) => {
                console.log('ERROR!: ', err.message);
                console.log('status', err.status);
                reject(err);
            });
        });
    }

    logout(){
        return new Promise((resolve, reject) => {
            this.http.post(this.apiUrl+'/auth/logout', {},{
                headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', localStorage.getItem("api_token")),
                //params: new HttpParams().set('',''),
            }).subscribe(res => {
                localStorage.clear();
                resolve(res);
            }, (err: HttpErrorResponse) => {
                console.log('ERROR!: ', err.message);
                console.log('status', err.status);
                reject(err);
            });
        });
    }

}
