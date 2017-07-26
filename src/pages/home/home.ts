import { InformePage } from './../informe/informe';
import { AuthService } from './../../providers/auth-service';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private platform: Platform, private _us:AuthService) {

  }
  public salir(){
      this.navCtrl.setRoot(LoginPage);
      this._us.currentUser =null;
      this._us.guardar_storage();
  }
  public informePreventivo(){
      this.navCtrl.setRoot(InformePage);
  }
  public informecorectivo(){
      this.navCtrl.setRoot(InformePage);
  }
    public lanzarInforme(){
      this._us.lanzarweb("http://inventario.ecuatask.com/");
    }


}
