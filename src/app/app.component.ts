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
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getToken();
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
        this.accountService.DEVICE_TOKEN = token;
        console.log(token);
      });

      this.subscribeToTopic();
      this.unsubscribeFromTopic();

    });
  }

  subscribeToTopic() {
    this.fcm.subscribeToTopic('enappd');
  }

  unsubscribeFromTopic() {
    this.fcm.unsubscribeFromTopic('enappd');
  }

  getToken() {
    this.fcm.getToken().then(token => {
      this.accountService.DEVICE_TOKEN = token;
      console.log('token', token);
    });
  }

}
