import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform, ToastController } from '@ionic/angular';
import { UserDataService } from './providers/user-data.service';
import { SwUpdate } from '@angular/service-worker';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  dark = false;
  loggedIn = false;

  appPages = [
    {
      title: 'Schedule',
      url: '/app/tabs/schedule',
      icon: 'calendar'
    },
    {
      title: 'Speakers',
      url: '/app/tabs/speakers',
      icon: 'people'
    },
    {
      title: 'Map',
      url: '/app/tabs/map',
      icon: 'map'
    },
    {
      title: 'About',
      url: '/app/tabs/about',
      icon: 'information-circle'
    }
  ];

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private storage: Storage,
    private userData: UserDataService,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController
  ) { }

  async ngOnInit() {
    // create storage
    await this.storage.create();

    // check login status
    this.checkLoginStatus();

    // add event listener
    this.listenForLoginEvents();
  }

  /// *
  /// Method check login status
  ///  + call method isLoggedIn of user data 
  ///  + update logged status
  /// *
  async checkLoginStatus() {
    const loggedIn = await this.userData.isLoggedIn().then(
      loggedIn => {
        return this.updateLoggedInStatus(loggedIn);
      }
    );
  }

  /// *
  /// Method listen for login event
  ///  + Add event listener:
  ///       user:login
  ///       user:signup
  ///       user:logout
  /// *
  listenForLoginEvents() {
    window.addEventListener('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:logout', () => {
      this.updateLoggedInStatus(true);
    });
  }

  /// *
  /// Method update Logged status
  /// *
  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(
      () => {
        this.loggedIn = true;
      }, 300
    );
  }

  openTutorial() { }

  logout() { }
}
