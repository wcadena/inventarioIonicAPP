

import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
/**plugins*/
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {UserData} from "../models/user.model";
/**
 * storage
 */
import { Storage } from '@ionic/storage';
/**
 * elemtos de ionic angular
 */
import {Platform} from 'ionic-angular'
/**para navegacion */

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { URL_SERVICIOS,CLIENT_ID,CLIENT_SECRET,GRANT_TYPE,URL_TOKEN } from './../pages/config/app.config';

@Injectable()
export class AuthService {
  public currentUser: UserData;
  private http: any;
  public data: any;

  constructor(private iab: InAppBrowser,
              private storage:Storage,
              private platform: Platform,
              http: Http) {
                this.http = http;
               }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        //console.log(credentials);
        let access = (credentials.password === "wcadena" && credentials.email === "wcadena@outlook2.com");

        this.currentUser = new UserData('Wagner', 'wcadena@outlook.com');
        //this.lanzarweb("http://inventario.ecuatask.com/");

        observer.next(access);
        observer.complete();
      });
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public lanzarweb(web:string){
     this.iab.create(web);

  }

  public getUserInfo() : UserData {
    return this.currentUser;
  }

  public guardar_storage(){
    console.log("Guardar en storage");
      let promesa= new Promise((resolve,reject ) =>{
          if(this.platform.is("cordova")){
            //es un dispositivo
            console.log("Dispositivo movil");
            this.storage.set('user', this.currentUser);
            resolve();
          }else{
            //esta en la computadora
            console.log("computadora");
            if(this.currentUser){
              localStorage.setItem('user.name', this.currentUser.name);
              localStorage.setItem('user.email', this.currentUser.email);
              resolve();
            }else{
              localStorage.removeItem('user.name');
              localStorage.removeItem('user.email');
              resolve();
            }
          }
      });
      return promesa;
  }
  public cargar_storage(){
    this.consultaapi_clave();
    let promesa= new Promise((resolve,reject ) =>{
      if(this.platform.is("cordova")){
        //es un dispositivo
        console.log("carga desde dispositivo");
        this.storage.ready()
          .then( () =>{
            console.log("Listo Para cargar desde el storage");
            this.storage.get('user').then((val) => {
              this.currentUser = val;
              resolve(this.currentUser);
            });
          });
      }else{
        //esta en la computadora
        console.log("carga desde computadora");
        this.currentUser = new UserData(localStorage.getItem('user.name'), localStorage.getItem('user.email'));
        resolve(this.currentUser);
      }
      console.log("------------------------------------------------>mensaje carga");
    }).catch((err: any) => {
      console.log(err);
      });
    return promesa;
  }


  public consultaapi_clave(){
    console.log("Consulta api login");


      let promesa= new Promise((resolve,reject ) =>{
          //let url_tok =URL_TOKEN;
          let url_tok = "http://inventario.ecuatask.com/api/users";
          this.http.get(url_tok,{ headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImIxZjE2MjVlMzBjNzBjODI2MzQ2ZjllOTNiYmU2YTMxOTZhYTEyN2E3Mjg2N2M4MmIyN2Y0NzQzODNhN2QyMzdkMGI5OGI5NTJhMTI5ZWU0In0.eyJhdWQiOiI3IiwianRpIjoiYjFmMTYyNWUzMGM3MGM4MjYzNDZmOWU5M2JiZTZhMzE5NmFhMTI3YTcyODY3YzgyYjI3ZjQ3NDM4M2E3ZDIzN2QwYjk4Yjk1MmExMjllZTQiLCJpYXQiOjE1MDEwMDU2NzAsIm5iZiI6MTUwMTAwNTY3MCwiZXhwIjoxNTEzOTY1NjY5LCJzdWIiOiIiLCJzY29wZXMiOltdfQ.AkZpBnUX7XaCNsrp8I1U8lhWCaDFWt7XdRdVws1eVVqk8kEQkGryXJb_1brn9qzfNKqG3qZ3HyGVCj1NOru3mSUMq7CngRZnukCEO2_YZfHVXaWFgovK0p3rY47PrxrF8mXME6r3I7QxEFvogT5q20sJi-gQIoJ0SyOi97vq__viV3StcEQ66DYrxpf3zw-VY4uNi_zwmN9mbWCdi1cTSIcdTmBescjQBtl96vekki-oGvYDODlo83HTyDScyDfGeK95Awksfh7KmAi69sjAKyPeXpgXBOMjYx0iJ8mkbcdyS6Wq0_oEDLwRhGeHUaSQLUU4cyraYvO3nwobzQ3PWZxPriTnY7p_xOVxJTE1oMYuf336t3UrOtRaNtshQ45BBgHGksWHKBbyVEJHzg82FQ6e5feu-tfS1ISl4ft3NhE3_QkYESZwuRI9sPevBwDMFgrChudqUaV6iFxPnBTfuKbHbnm3sbTgDE59VCo4_iQi04wMCQxIV_5hIAYLmgpujp7lmZzUNezUibodfJcGSm-47O71qX7PzusW2JsBTT_MJBz3qBZJt_hpAh3qhO0nzrjBo0gGIQiF5JGTRZhYiixnAS0c08DDCGVix97A_28s-E-gaVMWM_GpzJaMvHmaTRjtO4S4tFooiE2tFTMw_f969DBxTQlnkMvjgwp1EU0' } })
          .subscribe(res => {
              this.data = res.json();
              console.log(this.data);
          }, error => {
              console.log(error);
          });
      });
      return promesa;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}

