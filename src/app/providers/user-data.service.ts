import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  HAS_LOGGED_IN = 'hasLoggedIn';
  constructor(public storage: Storage) { }

  /// *
  /// Method is Logged In
  ///  + get status login
  ///    return true/ false
  /// *
  async isLoggedIn(): Promise<boolean>{
    const value = await this.storage.get(this.HAS_LOGGED_IN);

    return value === true;
  }

  /// *
  /// Method login
  ///   + set status login true
  ///   + dispatch event: user login
  /// *
  async login(userName: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(
      () => {
        this.setUserName(userName);

        return window.dispatchEvent(new CustomEvent('user:login'));
      }
    )
  }

  /// *
  /// Method set user name after login success
  /// *
  setUserName(userName: string): Promise<any>{
    return this.storage.set('userName', userName);
  }

}
