import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { first } from 'rxjs';
import { Song } from 'src/app/models/song.interface';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  // inject all those services to the constructor and initialize our form
  createSongForm!: FormGroup;

  // object song (case edit)
  song: Song;

  // flag (create/edit)
  // True: Create, False: Edit
  isAddMode: boolean;

  constructor(
    private readonly loadingCtrl: LoadingController,
    private readonly alertCtrl: AlertController,
    private firestoreService: FirestoreService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.song = {id: '', albumName: '', artistName: '', songDescription: '', songName: ''};
    this.isAddMode = true;
  }

  ngOnInit() {
    this.song.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.song.id;

    this.createSongForm = this.formBuilder.group({
      albumName: ['', Validators.required],
      artistName: ['', Validators.required],
      songDescription: ['', Validators.required],
      songName: ['', Validators.required],
    });

    if (!this.isAddMode) {
      this.firestoreService
      .getSongDetail(this.song.id)
      .pipe(first())
      .subscribe(song => this.createSongForm.patchValue(song));
    }
  }

  /// function that collects the data and sends it to the service if you remember the HTML part
  async createSong() {
    // 1. The first thing we want to do inside that function is to trigger a loading component 
    //    that will let the user know that the data is processing, and after that, we’ll extract all the field data from the form.
    const loading = await this.loadingCtrl.create();

    this.song.albumName = this.createSongForm.value.albumName;
    this.song.artistName = this.createSongForm.value.artistName;
    this.song.songDescription = this.createSongForm.value.songDescription;
    this.song.songName = this.createSongForm.value.songName;

    if(this.isAddMode){
      this.create(loading);
    }else{
      this.edit(loading);
    }
    

    return await loading.present();
  }

  /// function create song
  private create(loading: HTMLIonLoadingElement){
    // 2. And lastly, we’ll send the data to the service, 
    // once the song is successfully created the user should navigate back to the previous page, 
    // and if there’s anything wrong while creating it we should display an alert with the error message.
    this.firestoreService
      .createSong(this.song)
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
                //instead of showing the default error message to the users make sure you do something more user-friendly
                console.error(error);
              }
            )
          }
        );
      });
  }

  /// function edit song
  private edit(loading: HTMLIonLoadingElement){
    // 2. And lastly, we’ll send the data to the service, 
    // once the song is successfully created the user should navigate back to the previous page, 
    // and if there’s anything wrong while creating it we should display an alert with the error message.
    this.firestoreService
      .editSong(this.song)
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
                //instead of showing the default error message to the users make sure you do something more user-friendly
                console.error(error);
              }
            )
          }
        );
      });
  }
}
