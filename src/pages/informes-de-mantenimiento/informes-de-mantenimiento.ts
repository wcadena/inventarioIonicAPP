import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {InfoSisProvider} from "../../providers/info-sis/info-sis";

@Component({
  selector: 'page-informes-de-mantenimiento',
  templateUrl: 'informes-de-mantenimiento.html'
})
export class InformesDeMantenimientoPage {
  private  infoDat:InfoSisProvider;

  constructor(public navCtrl: NavController) {
    console.log("Test0 alsdijasld9jasd9lajsdlh");

  }

}
