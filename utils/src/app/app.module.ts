import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { InformeDeMantenimientoPreventivoPage } from '../pages/informe-de-mantenimiento-preventivo/informe-de-mantenimiento-preventivo';
import { SignupPage } from '../pages/signup/signup';
import { CerrarInformePage } from '../pages/cerrar-informe/cerrar-informe';
import { InformesDeMantenimientoPage } from '../pages/informes-de-mantenimiento/informes-de-mantenimiento';
import { EnviarInformeAPage } from '../pages/enviar-informe-a/enviar-informe-a';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    InformeDeMantenimientoPreventivoPage,
    SignupPage,
    CerrarInformePage,
    InformesDeMantenimientoPage,
    EnviarInformeAPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InformeDeMantenimientoPreventivoPage,
    SignupPage,
    CerrarInformePage,
    InformesDeMantenimientoPage,
    EnviarInformeAPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}