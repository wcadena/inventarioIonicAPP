
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

@Injectable()
export class AuthService {
  public currentUser: UserData;

  constructor(private iab: InAppBrowser,
              private storage:Storage,
              private platform: Platform) { }

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
          }else{
            //esta en la computadora
            console.log("computadora");
            if(this.currentUser){
              localStorage.setItem('user.name', this.currentUser.name);
              localStorage.setItem('user.email', this.currentUser.email);
            }else{
              localStorage.removeItem('user.name');
              localStorage.removeItem('user.email');
            }
          }
      });
      return promesa;
  }
  public cargar_storage(){
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

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}

