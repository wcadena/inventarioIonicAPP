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
import { HomePage ,LoginPage ,CategoriaPage,InformePage} from  '../pages/index.paginas';
/**modelos */
//import {UserData} from '../models/user.model';
/**providers */
import { AuthService } from '../providers/auth-service';
import { InfoProvider } from '../providers/info/info';

@NgModule({
  declarations: [
    MyApp,
    HomePage ,
    LoginPage ,
    CategoriaPage,
    InformePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage ,
    LoginPage ,
    CategoriaPage,
    InformePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    InAppBrowser,
    IonicStorageModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InfoProvider
  ]
})
export class AppModule {}
