


import { Injectable } from '@angular/core';
//import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
// plugins
//import { InAppBrowser } from '@ionic-native/in-app-browser';
import {UserData} from "../../models/user.model";
// storage
//import { Storage } from '@ionic/storage';
// * elemtos de ionic angular
//import {Platform} from 'ionic-angular'
// para navegacion
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import { CLIENT_ID,CLIENT_SECRET,GRANT_TYPE,URL_TOKEN } from '../../config/app.config';
import {AuthService} from "../auth-service";

@Injectable()
export class UserSisProvider {
  public currentUser: UserData;
  rootPage:any;
  private http: any;
  public data: any;
  private toastCtrl: ToastController;
  public _us:AuthService;
  constructor(http: Http,_us:AuthService) {
                this.http = http;
                this._us=_us;
                this._us.cargar_storage()
                  .then(()=>{
                    this.currentUser=this._us.currentUser;
                  }).catch((err: any) => {
                  this.presentToast(err+"");
                });
               }

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
  public load(){
    console.log("Consulta api login");
    let promesa= new Promise((resolve,reject ) =>{
      //let url_tok =URL_TOKEN;
      let permiso ="Bearer "+this.currentUser.access_token;
      let url_tok = "http://inventario.ecuatask.com/api/users";
      this.http.get(url_tok,{ headers: { Authorization: permiso } })
        .subscribe(res => {
          this.data = res.json();
          console.log(this.data);

        }, error => {
          this.presentToast(error);
        });
    });
    return promesa;
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


