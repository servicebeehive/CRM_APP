import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AccountService } from './services/account/account.service';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public UniqueDeviceID: string;

  constructor(public router: Router,
    public accountService: AccountService,
    public platform: Platform,
    public fcm: FCM,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar) {
    this.initilizeApp();
    this.router.navigate(['/']);
    this.accountService.removeToken();

  }


  initilizeApp() {
    console.log('test');
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
      console.log('test');
      this.fcm.getToken().then(token => {
        console.log('token', token);
      });

      this.fcm.onNotification().subscribe(data => {
        console.log(data);
        if (data.wasTapped) {
          console.log('Received in background');
        } else {
          console.log('Received in foreground');
        }
      });
      // refresh the FCM token
      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
      });

    })
  }

}
