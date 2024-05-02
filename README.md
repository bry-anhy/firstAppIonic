"# firstAppIonic" 


https://github.com/ionic-team/ionic-conference-app
This application is purely a kitchen-sink demo of the Ionic Framework and Angular.
There is not an actual Ionic Conference at this time. 
This project is just to show off Ionic components in a real-world application

1. Service worker
https://angular.io/guide/service-worker-getting-started#cli-command
https://blog.angular-university.io/angular-service-worker/
ng add @angular/pwa
   Note: 
      SwUpdate for managing application version updates
      SwPush for doing server Web Push notifications


https://www.npmjs.com/package/@ionic/storage-angular
npm i @ionic/storage-angular --force


2. Create
  providers/user-data.service.ts
      ionic g service providers/user-data
  pages/tutorial
      ionic g page pages/tutorial
  pages/tabs-page
      ionic g page pages/tabs-page
  pages/schedule
      ionic g page pages/schedule
  providers/check-tutorial.guard
      ionic g service providers/check-tutorial.guard

----------------------------------------------------------------------
Deploying
Progressive Web App
    Run ionic build --prod
    Push the www folder to your hosting service
Android
    Run ionic cordova run android --prod
iOS
    Run ionic cordova run ios --prod
----------------------------------------------------------------------