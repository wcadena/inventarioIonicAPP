import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InformePage } from './informe';

@NgModule({
  declarations: [
    InformePage,
  ],
  imports: [
    IonicPageModule.forChild(InformePage),
  ],
  exports: [
    InformePage
  ]
})
export class InformePageModule {}
