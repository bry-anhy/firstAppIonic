import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../models/song.interface';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  /// We want the Song interface for a strict type checking, 
  /// the FirestoreService to communicate with the database, 
  /// and Observable also for type checking, 
  /// our service will return an AngularFirestoreCollection that we’ll turn into an observable to display on our view.
  songList: Observable<Song[]> = this.firestoreService.getSongList();
  constructor(
    private firestoreService: FirestoreService
  ) {}

}
