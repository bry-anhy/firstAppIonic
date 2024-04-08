import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Song } from 'src/app/models/song.interface';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  song: Song | undefined;
  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router
  ) {    
  }

  /// We need to create a property song of type Song, for that we need to import the Song interface.
  /// Then, you want to get the navigation parameter we sent to the page and assign its value to the song property you created.
  ngOnInit() {
    const songId: string = this.route.snapshot.paramMap.get('id') ?? "";
    this.firestoreService.getSongDetail(songId).subscribe(
      song => {
        this.song = song;
      }
    )
  }

  /// function, it should take 2 parameters, the song’s ID and the song’s name
  /// The function should trigger an alert that asks the user for confirmation, 
  /// and if the user accepts the confirmation, 
  /// it should call the delete function from the service, and then return to the previous page
  async deleteSong(songId: string, songName: string): Promise<void> {
    console.log(`songId: ${songId} ${songName}`);
    
    const alert = await this.alertController.create(      
      {
        header: 'Confirm!',
        message: `Are you sure you want to delete ${songName}`,
        buttons:[
          {
            text: 'Cancel',
            role: 'cancel',
            handler: blah =>{
              console.log('Confirm cancel: blah');
            }
          },
          {
            text: 'OK',
            handler: () =>{
              this.firestoreService.deleteSong(songId).then(() =>{
                this.router.navigateByUrl('');
              });
            }
          }
        ]
      }
    );

    await alert.present();
  }

}
