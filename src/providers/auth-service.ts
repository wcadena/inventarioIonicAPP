

import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
// plugins
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {UserData} from "../models/user.model";
// storage
import { Storage } from '@ionic/storage';
// * elemtos de ionic angular
import {Platform} from 'ionic-angular'
// para navegacion
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import { CLIENT_ID,CLIENT_SECRET,GRANT_TYPE,URL_TOKEN } from '../config/app.config';

@Injectable()
export class AuthService {
  public currentUser: UserData;

  private http: any;
  public data: any;

  constructor(private iab: InAppBrowser,
              private storage:Storage,
              private platform: Platform,
              private toastCtrl: ToastController,
              http: Http) {
                this.http = http;
               }

  /**
   * recive las
   * @param credentials
   * @returns {any}
   */
  public login_auth_services(credentials) {
    if (credentials.email === null || credentials.password === null) {
        return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        this.consultaapi_clave2(credentials.email,credentials.password)
          .then(
              () => {
                  if(this.currentUser==null){
                    observer.next(false);
                  }else{
                    observer.next(this.currentUser.access_token);
                  }
                  observer.complete();
              },
              () => {
                console.log("Task Errored![lkjliasdn898a9sdy>0sa0]");
                observer.next(false);
                observer.complete();
              });

        //this.lanzarweb("http://inventario.ecuatask.com/");

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

  /***
   * lanza de una pagina web
   * @param web
   */
  public lanzarweb(web:string){
     this.iab.create(web);

  }



  /**
   * guarda los datos en el storage del dispositivo o en el computador para realizar pruebas, es asincrono
   * @returns {Promise<T>}
   */
  public guardar_storage(){
      let promesa= new Promise((resolve,reject ) =>{
          if(this.platform.is("cordova")){
            //es un dispositivo
            this.storage.set('user', this.currentUser);
            resolve();
          }else{
            //esta en la computadora

            if(this.currentUser){
              localStorage.setItem('user.email',this.currentUser.email);
              localStorage.setItem('user.token_type',this.currentUser.token_type);
              localStorage.setItem('user.expires_in',this.currentUser.expires_in.toString());
              localStorage.setItem('user.access_token',this.currentUser.access_token);
              localStorage.setItem('user.refresh_token',this.currentUser.refresh_token);

              resolve();
            }else{
              localStorage.removeItem('user.email');
              localStorage.removeItem('user.token_type');
              localStorage.removeItem('user.expires_in');
              localStorage.removeItem('user.access_token');
              localStorage.removeItem('user.refresh_token');
              resolve();
            }
          }
      });
      return promesa;
  }

  /***
   * carga los datos de memoria listo para ver si es usuario valido o se debe logear
   * @returns {Promise<TResult|T>}
   */
  public cargar_storage(){
    let promesa= new Promise((resolve,reject ) =>{
      if(this.platform.is("cordova")){
        //es un dispositivo
        this.storage.ready()
          .then( () =>{
            this.storage.get('user').then((val) => {
              this.currentUser = val;
              resolve(this.currentUser);
            });
          });
      }else{
        //esta en la computadora
        this.currentUser = new UserData(localStorage.getItem('user.email'),localStorage.getItem('user.token_type'),parseInt(localStorage.getItem('user.expires_in')),localStorage.getItem('user.access_token'),localStorage.getItem('user.refresh_token'));
        resolve(this.currentUser);
      }
    }).catch((err: any) => {
        this.presentToast(err);
      });
    return promesa;
  }

  /**
   * consulta catalogos de usuarios
   */


  /**
   * consulta el token de transaccion y lo pone en la variable global this.currentUser
   * la informacion lo toma del servicio que se configura el config, es un dato asincronico
   * @param username
   * @param password
   * @returns {Promise<T>}
   */
  public consultaapi_clave2(username:string,password:string){

      let promesa= new Promise((resolve,reject ) =>{

          let url_tok =URL_TOKEN;
          ///////////////////////////////////////////////////////////////
        let data = new URLSearchParams();
        data.append("grant_type", GRANT_TYPE );
        data.append("client_id", CLIENT_ID );
        data.append("client_secret", CLIENT_SECRET );
        data.append("username", username );
        data.append("password", password );


        /////////////////////////////////////////////////////////////
          //let url_tok = "http://inventario.ecuatask.com/api/users";
          this.http.post(url_tok,data)
          .subscribe(res => {
              this.data = res.json();
              if(this.data.error){
                console.log("Error:["+this.data.error+"] - "+this.data.message)
                console.log(this.data);
                this.currentUser = null;
                resolve();
              }else{
                this.currentUser = new UserData(username,this.data.token_type,parseInt(this.data.expires_in),this.data.access_token,this.data.refresh_token);;
                resolve();
              }

          }, error => {
              console.log("Error codigos [asdojsad92#wwdpkj111]")
              console.log(error);
              resolve();
          });
      });
      return promesa;
  }

  /**
   * ejemplo de consulta, no se usa en lugar alguno por el momento
   * @returns {Promise<T>}
   */
  public consultaapiget_clave(){
    console.log("Consulta api login");
    let promesa= new Promise((resolve,reject ) =>{
      //let url_tok =URL_TOKEN;
      let url_tok = "http://inventario.ecuatask.com/api/users";
      this.http.get(url_tok,{ headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImIxZjE2MjVlMzBjNzBjODI2MzQ2ZjllOTNiYmU2YTMxOTZhYTEyN2E3Mjg2N2M4MmIyN2Y0NzQzODNhN2QyMzdkMGI5OGI5NTJhMTI5ZWU0In0.eyJhdWQiOiI3IiwianRpIjoiYjFmMTYyNWUzMGM3MGM4MjYzNDZmOWU5M2JiZTZhMzE5NmFhMTI3YTcyODY3YzgyYjI3ZjQ3NDM4M2E3ZDIzN2QwYjk4Yjk1MmExMjllZTQiLCJpYXQiOjE1MDEwMDU2NzAsIm5iZiI6MTUwMTAwNTY3MCwiZXhwIjoxNTEzOTY1NjY5LCJzdWIiOiIiLCJzY29wZXMiOltdfQ.AkZpBnUX7XaCNsrp8I1U8lhWCaDFWt7XdRdVws1eVVqk8kEQkGryXJb_1brn9qzfNKqG3qZ3HyGVCj1NOru3mSUMq7CngRZnukCEO2_YZfHVXaWFgovK0p3rY47PrxrF8mXME6r3I7QxEFvogT5q20sJi-gQIoJ0SyOi97vq__viV3StcEQ66DYrxpf3zw-VY4uNi_zwmN9mbWCdi1cTSIcdTmBescjQBtl96vekki-oGvYDODlo83HTyDScyDfGeK95Awksfh7KmAi69sjAKyPeXpgXBOMjYx0iJ8mkbcdyS6Wq0_oEDLwRhGeHUaSQLUU4cyraYvO3nwobzQ3PWZxPriTnY7p_xOVxJTE1oMYuf336t3UrOtRaNtshQ45BBgHGksWHKBbyVEJHzg82FQ6e5feu-tfS1ISl4ft3NhE3_QkYESZwuRI9sPevBwDMFgrChudqUaV6iFxPnBTfuKbHbnm3sbTgDE59VCo4_iQi04wMCQxIV_5hIAYLmgpujp7lmZzUNezUibodfJcGSm-47O71qX7PzusW2JsBTT_MJBz3qBZJt_hpAh3qhO0nzrjBo0gGIQiF5JGTRZhYiixnAS0c08DDCGVix97A_28s-E-gaVMWM_GpzJaMvHmaTRjtO4S4tFooiE2tFTMw_f969DBxTQlnkMvjgwp1EU0' } })
        .subscribe(res => {
          this.data = res.json();
          console.log(this.data);
          this.guardar_storage()
        }, error => {
          this.presentToast(error);
        });
    });
    return promesa;
  }

  /**
   * salir de aplicacion,borra los datos guardados del login
   * @returns {any}
   */
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

  /**
   * lansa un mensaje tost muy discreto
   * @param mensaje
   */
  presentToast(mensaje:string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}

