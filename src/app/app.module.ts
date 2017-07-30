import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
/**
 * plugins
 */
import { InAppBrowser } from '@ionic-native/in-app-browser';
//storage
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
/**paginas */
import { HomePage ,LoginPage ,CategoriaPage,InformePage,InformeDeMantenimientoPreventivoPage,SignupPage,CerrarInformePage,InformesDeMantenimientoPage,EnviarInformeAPage } from  '../pages/index.paginas';

/**modelos */
//import {UserData} from '../models/user.model';
/**providers */
import { AuthService } from '../providers/auth-service';
import { InfoProvider } from '../providers/info/info';
import { HTTP } from '@ionic-native/http';
//import { Http } from '@angular/http';
/**para navegacion */
import { HttpModule } from '@angular/http';
import {UserSisProvider} from '../providers/user-sis/user-sis-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage ,
    LoginPage ,
    CategoriaPage,
    InformePage,
    InformeDeMantenimientoPreventivoPage,
    SignupPage,
    CerrarInformePage,
    InformesDeMantenimientoPage,
    EnviarInformeAPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage ,
    LoginPage ,
    CategoriaPage,
    InformePage,
    InformeDeMantenimientoPreventivoPage,
    SignupPage,
    CerrarInformePage,
    InformesDeMantenimientoPage,
    EnviarInformeAPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    InAppBrowser,
    IonicStorageModule,
    HTTP,
    //Http,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InfoProvider,
    UserSisProvider
  ]
})
export class AppModule {}
