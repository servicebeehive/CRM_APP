/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { UserDetail } from 'src/app/models/userdetail.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public ACCESS_TOKEN?: string;
  public USER_NAME?: string;

  constructor(public storage: Storage) {
    this.storage.create();
  }

  public accessToken(): Promise<string> | null {
    return new Promise((resolve, reject) => {
      this.storage.get('access-token').then((res: string) => {
        this.ACCESS_TOKEN = res;
        resolve(this.ACCESS_TOKEN);
      });
    });
  }

  public getUserNameStorage(): Promise<string> | null {
    return new Promise((resolve, reject) => {
      this.storage.get('username').then((res: string) => {
        this.USER_NAME = res;
        resolve(this.USER_NAME);
      });
    });
  }

  public setAccessToken(userDetails: UserDetail) {
    this.ACCESS_TOKEN = userDetails.usertoken;
    if (userDetails.usertoken == null) {
      this.storage.remove('access-token');
      this.storage.remove('username');
      return;
    } else {
      this.storage.set('access-token', userDetails.usertoken);
      this.storage.set('username', userDetails.username);
    }
  }

  public isLoggedIn(): boolean {
    this.accessToken().then((response) => {
      this.ACCESS_TOKEN = response;
    });
    return this.ACCESS_TOKEN != null;
  }

  public getToken(): string {
    this.accessToken().then((response) => {
      this.ACCESS_TOKEN = response;
    });
    return this.ACCESS_TOKEN;
  }

  public getUserName(): string {
    this.getUserNameStorage().then((response) => {
      this.USER_NAME = response;
      return this.USER_NAME;
    });
    return this.USER_NAME;
  }

  public removeToken(): void {
    this.ACCESS_TOKEN = null;
    this.USER_NAME = null;
    this.storage.remove('access-token');
  }
}
