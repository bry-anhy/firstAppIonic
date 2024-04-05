import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  // inject all those services to the constructor and initialize our form
  createSongForm: FormGroup;
  constructor(
    private readonly loadingCtrl: LoadingController,
    private readonly alertCtrl: AlertController,
    private firestoreService: FirestoreService,
    formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createSongForm = formBuilder.group({
      albumName: ['', Validators.required],
      artistName: ['', Validators.required],
      songDescription: ['', Validators.required],
      songName: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  /// function that collects the data and sends it to the service if you remember the HTML part
  async createSong(){
    // 1. The first thing we want to do inside that function is to trigger a loading component 
    //    that will let the user know that the data is processing, and after that, we’ll extract all the field data from the form.
    const loading = await this.loadingCtrl.create();

    const albumName = this.createSongForm.value.albumName;
    const artistName = this.createSongForm.value.artistName;
    const songDescription = this.createSongForm.value.songDescription;
    const songName = this.createSongForm.value.songName;

    // 2. And lastly, we’ll send the data to the service, 
    // once the song is successfully created the user should navigate back to the previous page, 
    // and if there’s anything wrong while creating it we should display an alert with the error message.
    this.firestoreService
    .createSong(albumName, artistName, songDescription, songName)
    .then(() => {
      loading.dismiss().then(
        () => {
          this.router.navigateByUrl('');
        },
        error => {
          loading.dismiss().then(
            () => {
              // Only example: 
              // you should handle those errors yourself, 
              // instead of showing the default error message to the users make sure you do something more user-friendly
              console.error(error);
            }
          )
        }
      );
    });

    return await loading.present();
  }

}
