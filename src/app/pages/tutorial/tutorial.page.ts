import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  showSkip = true;
  constructor(
    public menu: MenuController,
    public router: Router,
    public storage: Storage
  ) { }

  ngOnInit() {
  }

  /// *
  /// Event startApp
  ///   + Navigate by url to schedule page
  ///   + Set flag ion_did_tutorial is true (success)
  /// *
  startApp() {
    this.router
      .navigateByUrl('/app/tabs/schedule', { replaceUrl: true })
      .then(() => this.storage.set('ion_did_tutorial', true));
  }

  /// *
  /// ref: https://ionicframework.com/docs/angular/lifecycle
  /// Life cycle app: ionViewWillEnter
  ///   + Navigate by url to schedule page (when ion_did_tutorial is true)
  /// note: auto navigate schedule page when user has finished readding the instructions (tutorial), 
  /// *
  ionViewWillEnter() {
    this.storage.get('ion_did_tutorial').then(res => {
      if (res === true) {
        this.router.navigateByUrl('/app/tabs/schedule', { replaceUrl: true });
      }
    });

    this.menu.enable(false);
  }

  /// *
  /// Life cycle app: ionViewDidLeave
  ///   + Navigate by url to schedule page (when ion_did_tutorial is true)
  /// *
  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
