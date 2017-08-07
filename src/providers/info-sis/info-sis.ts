import { ToastController } from 'ionic-angular';
import {UserData} from "../../models/user.model";
import { AuthService } from './../auth-service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the InfoSisProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class InfoSisProvider {

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
