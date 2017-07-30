


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

@Injectable()
export class UserSisProvider {
  public currentUser: UserData;

  private http: any;
  public data: any;

  constructor(private toastCtrl: ToastController,
              http: Http) {
                this.http = http;
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
      let permiso ="Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImIxZjE2MjVlMzBjNzBjODI2MzQ2ZjllOTNiYmU2YTMxOTZhYTEyN2E3Mjg2N2M4MmIyN2Y0NzQzODNhN2QyMzdkMGI5OGI5NTJhMTI5ZWU0In0.eyJhdWQiOiI3IiwianRpIjoiYjFmMTYyNWUzMGM3MGM4MjYzNDZmOWU5M2JiZTZhMzE5NmFhMTI3YTcyODY3YzgyYjI3ZjQ3NDM4M2E3ZDIzN2QwYjk4Yjk1MmExMjllZTQiLCJpYXQiOjE1MDEwMDU2NzAsIm5iZiI6MTUwMTAwNTY3MCwiZXhwIjoxNTEzOTY1NjY5LCJzdWIiOiIiLCJzY29wZXMiOltdfQ.AkZpBnUX7XaCNsrp8I1U8lhWCaDFWt7XdRdVws1eVVqk8kEQkGryXJb_1brn9qzfNKqG3qZ3HyGVCj1NOru3mSUMq7CngRZnukCEO2_YZfHVXaWFgovK0p3rY47PrxrF8mXME6r3I7QxEFvogT5q20sJi-gQIoJ0SyOi97vq__viV3StcEQ66DYrxpf3zw-VY4uNi_zwmN9mbWCdi1cTSIcdTmBescjQBtl96vekki-oGvYDODlo83HTyDScyDfGeK95Awksfh7KmAi69sjAKyPeXpgXBOMjYx0iJ8mkbcdyS6Wq0_oEDLwRhGeHUaSQLUU4cyraYvO3nwobzQ3PWZxPriTnY7p_xOVxJTE1oMYuf336t3UrOtRaNtshQ45BBgHGksWHKBbyVEJHzg82FQ6e5feu-tfS1ISl4ft3NhE3_QkYESZwuRI9sPevBwDMFgrChudqUaV6iFxPnBTfuKbHbnm3sbTgDE59VCo4_iQi04wMCQxIV_5hIAYLmgpujp7lmZzUNezUibodfJcGSm-47O71qX7PzusW2JsBTT_MJBz3qBZJt_hpAh3qhO0nzrjBo0gGIQiF5JGTRZhYiixnAS0c08DDCGVix97A_28s-E-gaVMWM_GpzJaMvHmaTRjtO4S4tFooiE2tFTMw_f969DBxTQlnkMvjgwp1EU0";
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


