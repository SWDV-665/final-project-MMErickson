import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SummaryPage } from '../pages/summary/summary';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Provider
import { CalcProvider } from '../providers/Data/calculate-estimate';

// Cordova plugins
import { EmailComposer } from '@ionic-native/email-composer';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    SummaryPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SummaryPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CalcProvider,
    EmailComposer,
    Camera, 
  ]
})

export class AppModule {}
