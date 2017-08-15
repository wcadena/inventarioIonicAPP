import { URL_SERVICIOS } from './../../config/app.config';
import { Observable } from 'rxjs/Observable';
import { ToastController } from 'ionic-angular';
import {UserData} from "../../models/user.model";
import { AuthService } from './../auth-service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { InfoData } from '../../models/info.model';


/*
  Generated class for the InfoSisProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class InfoSisProvider {

  public currentUser: UserData;
  rootPage:any;
  private http: any;
  public data: any;
  private toastCtrl: ToastController;
  public _us:AuthService;
  public _baseUrl: string = '';

  constructor(http: Http,_us:AuthService) {
                this.http = http;
                this._us=_us;
                this._us.cargar_storage()
                  .then(()=>{
                    this.currentUser=this._us.currentUser;
                    this._baseUrl = URL_SERVICIOS;
                  }).catch((err: any) => {
                  this.presentToast(err+"");
                });
               }

  /**
   * name
   */
  getInfo(): Observable<InfoData[]> {
    console.log("habanico 1");

    let url_tok = "http://inventario.ecuatask.com/api/users";
      return this.http.get(url_tok,{ headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImIxZjE2MjVlMzBjNzBjODI2MzQ2ZjllOTNiYmU2YTMxOTZhYTEyN2E3Mjg2N2M4MmIyN2Y0NzQzODNhN2QyMzdkMGI5OGI5NTJhMTI5ZWU0In0.eyJhdWQiOiI3IiwianRpIjoiYjFmMTYyNWUzMGM3MGM4MjYzNDZmOWU5M2JiZTZhMzE5NmFhMTI3YTcyODY3YzgyYjI3ZjQ3NDM4M2E3ZDIzN2QwYjk4Yjk1MmExMjllZTQiLCJpYXQiOjE1MDEwMDU2NzAsIm5iZiI6MTUwMTAwNTY3MCwiZXhwIjoxNTEzOTY1NjY5LCJzdWIiOiIiLCJzY29wZXMiOltdfQ.AkZpBnUX7XaCNsrp8I1U8lhWCaDFWt7XdRdVws1eVVqk8kEQkGryXJb_1brn9qzfNKqG3qZ3HyGVCj1NOru3mSUMq7CngRZnukCEO2_YZfHVXaWFgovK0p3rY47PrxrF8mXME6r3I7QxEFvogT5q20sJi-gQIoJ0SyOi97vq__viV3StcEQ66DYrxpf3zw-VY4uNi_zwmN9mbWCdi1cTSIcdTmBescjQBtl96vekki-oGvYDODlo83HTyDScyDfGeK95Awksfh7KmAi69sjAKyPeXpgXBOMjYx0iJ8mkbcdyS6Wq0_oEDLwRhGeHUaSQLUU4cyraYvO3nwobzQ3PWZxPriTnY7p_xOVxJTE1oMYuf336t3UrOtRaNtshQ45BBgHGksWHKBbyVEJHzg82FQ6e5feu-tfS1ISl4ft3NhE3_QkYESZwuRI9sPevBwDMFgrChudqUaV6iFxPnBTfuKbHbnm3sbTgDE59VCo4_iQi04wMCQxIV_5hIAYLmgpujp7lmZzUNezUibodfJcGSm-47O71qX7PzusW2JsBTT_MJBz3qBZJt_hpAh3qhO0nzrjBo0gGIQiF5JGTRZhYiixnAS0c08DDCGVix97A_28s-E-gaVMWM_GpzJaMvHmaTRjtO4S4tFooiE2tFTMw_f969DBxTQlnkMvjgwp1EU0' } })
        .subscribe(res => {
          this.data = res.json();
        }, error => {
          this.presentToast(error);
        });
    }

  /**
   * lansa un mensaje tost muy discreto
   * @param mensaje
   */
  presentToast(mensaje:string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
    }
  private handleError(error: any) {
        var applicationError = error.headers.get('Application-Error');
        var serverError = error.json();
        var modelStateErrors: string = '';

        if (!serverError.type) {
            console.log(serverError);
            for (var key in serverError) {
                if (serverError[key])
                    modelStateErrors += serverError[key] + '\n';
            }
        }

        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;

        return Observable.throw(applicationError || modelStateErrors || 'Server error');
    }


}
