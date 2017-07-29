import { InformePage } from './../informe/informe';
import { InformesDeMantenimientoPage } from './../informes-de-mantenimiento/informes-de-mantenimiento';
import { AuthService } from './../../providers/auth-service';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private _us:AuthService) {

  }
  public salir(){
      this.navCtrl.setRoot(LoginPage);
      this._us.currentUser =null;
      this._us.guardar_storage();
  }
  public informePreventivo(){
      this.navCtrl.setRoot(InformesDeMantenimientoPage);
  }
  public informecorectivo(){
      this.navCtrl.setRoot(InformePage);
  }
    public lanzarInforme(){
      this._us.lanzarweb("http://inventario.ecuatask.com/");
    }


}
