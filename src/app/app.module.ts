import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Routes, provideRouter, withComponentInputBinding } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { HomePageModule } from './home/home/home.module';

/// ******************************************************
/// For use @Input id
///     in page details.page.ts
/// (1). Define routes in here
const routes: Routes = [
  {path: 'details/:id', component: HomePageModule}
];
/// ******************************************************

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
    // (2). Define provideRouter in here
    provideRouter(routes, withComponentInputBinding())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
