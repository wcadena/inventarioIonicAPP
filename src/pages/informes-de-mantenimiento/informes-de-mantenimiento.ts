
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InfoSisProvider } from '../../providers/info-sis/info-sis';


@Component({
  selector: 'page-informes-de-mantenimiento',
  templateUrl: 'informes-de-mantenimiento.html'
})
export class InformesDeMantenimientoPage {
  ;

  constructor(public navCtrl: NavController,
  private  infoDat:InfoSisProvider) {
    console.log("Test0 alsdijasld9jasd9lajsdlh-1");

    this.infoDat.getInfo().subscribe(allowed => {
      if (allowed) {//si esta bien ingresa
        console.log(allowed);
      }
    },
      error => {
        //this.showError(error);
        console.log(error);
      });
    console.log("Test0 alsdijasld9jasd9lajsdlh-2");
   }

}
