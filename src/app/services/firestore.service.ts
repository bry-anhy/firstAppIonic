import { Injectable } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  /// Inject firestore in the constructor
  constructor(private readonly firestore:Firestore) { }

  /// write the createSong() function that takes all the parameters we sent from our form
  createSong(
    albumName: string,
    artistName: string, 
    songDescription: string, 
    songName: string): Promise<DocumentReference>{
      // Firestore service to call the function that will add the song to the database.
      return addDoc(collection(this.firestore, "songList"), {
        albumName,
        artistName,
        songDescription,
        songName
      });
  }
}
