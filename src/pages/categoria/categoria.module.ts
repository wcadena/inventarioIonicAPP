import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriaPage } from './categoria';

@NgModule({
  declarations: [
    CategoriaPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriaPage),
  ],
  exports: [
    CategoriaPage
  ]
})
export class CategoriaPageModule {}
