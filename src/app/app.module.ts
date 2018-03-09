import { BrowserModule } from '@angular/platform-browser';
import { Pro } from '@ionic/pro';
import { Injectable, Injector } from '@angular/core';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import {ContactPage} from "../pages/contact/contact";
import {MenuPage} from "../pages/menu/menu";
import {PopoverAboutPage} from "../pages/popover-about/popover-about";
import {ProductsPage} from "../pages/products/products";


import { RestProvider } from '../providers/rest/rest';

Pro.init('79d9958c', {
    appVersion: '0.0.1'
})
@Injectable()
export class MyErrorHandler implements ErrorHandler {
    ionicErrorHandler: IonicErrorHandler;

    constructor(injector: Injector) {
        try {
            this.ionicErrorHandler = injector.get(IonicErrorHandler);
        } catch(e) {
            // Unable to get the IonicErrorHandler provider, ensure
            // IonicErrorHandler has been added to the providers list below
        }
    }

    handleError(err: any): void {
        Pro.monitoring.handleNewError(err);
        // Remove this if you want to disable Ionic's auto exception handling
        // in development mode.
        this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
    }
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ContactPage,
    LoginPage,
    MenuPage,
    PopoverAboutPage,
    ProductsPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ContactPage,
    LoginPage,
    MenuPage,
    PopoverAboutPage,
    ProductsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    IonicErrorHandler,
    [{ provide: ErrorHandler, useClass: MyErrorHandler }],
    RestProvider
  ]
})
export class AppModule {}
