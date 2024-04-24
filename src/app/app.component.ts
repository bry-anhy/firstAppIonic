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
  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private storage: Storage,
    private userData: UserDataService,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController
  ) {}
}
