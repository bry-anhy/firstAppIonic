import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TutorialPageRoutingModule } from './tutorial-routing.module';

import { TutorialPage } from './tutorial.page';
import { SchedulePage } from '../schedule/schedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TutorialPageRoutingModule
  ],
  declarations: [
    TutorialPage,
    //--------------------------
    // declare schedule page in here
    // because routing schedule page has define in tutorial routing module
    // (not define in app-routing)
    //--------------------------
    SchedulePage
  ]
})
export class TutorialPageModule {}
