import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // },
  {
    path: '',
    loadChildren: () => import('./home/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home/home.module').then( m => m.HomePageModule)
  },
  // Working with Signals
  // In the beginning, the CLI automatically changed our routing, 
  // but we need to include the :id parameter manually now.
  {
    path: 'details/:id',  // <-- Add the :id parameter
    loadChildren: () => import('./details/details/details.module').then( m => m.DetailsPageModule)
  },  {
    path: 'home-defer',
    loadChildren: () => import('./home-defer/home-defer/home-defer.module').then( m => m.HomeDeferPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
