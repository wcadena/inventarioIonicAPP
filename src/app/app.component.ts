import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage ,LoginPage } from  '../pages/index.paginas';

//import {UserData} from '../models/user.model';
import {AuthService} from '../providers/auth-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any=LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private _us:AuthService ) {
    console.log("Dentro de constructor antes de platformready");
    platform.ready().then(() => {


    });
    console.log("Ingreso a ready app.components");
      this._us.cargar_storage()
        .then(()=>{
          console.log("Dentro de la promesa 1");
          console.log(this._us.currentUser);
          console.log("Dentro de la promesa 2");
          if(this._us.currentUser.name != null){
            this.rootPage = HomePage;
            console.log("es usuario de app");
          }else{
            this.rootPage = LoginPage;
            console.log("No es usuario de app");
          };
          statusBar.styleDefault();
          splashScreen.hide();
        }).catch((err: any) => {
            console.log(err);
        });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    console.log("fuera de ready app.components");
  }
}

