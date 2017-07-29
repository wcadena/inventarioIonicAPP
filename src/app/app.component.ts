import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage ,LoginPage } from  '../pages/index.paginas';

//import {UserData} from '../models/user.model';
import {AuthService} from '../providers/auth-service';
import { ToastController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private _us:AuthService, private toastCtrl: ToastController) {
    platform.ready().then(() => {
     //splashScreen.show();
      this._us.cargar_storage()
        .then(()=>{
          if(this._us.currentUser==null){
            this.rootPage = LoginPage;
          }else if(this._us.currentUser.access_token != null){
            this.presentToast("Bienvenido: "+this._us.currentUser.email);
            this.rootPage = HomePage;
          }else{
            this.rootPage = LoginPage;
          };
          statusBar.styleDefault();
          splashScreen.hide();
        }).catch((err: any) => {
        this.presentToast(err+"");
      });
    });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
  }

  /**
   * mensaje de error o de exito
   * @param mensaje
   */
  presentToast(mensaje:string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}

