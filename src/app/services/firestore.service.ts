import { Injectable } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, query} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Song } from '../models/song.interface';

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

  /// The collectionData() method takes the current Firestore instance and a reference to the collection we’re looking for
  /// It returns an observable list of the documents that match that query we’re sending.
  /// * The idField property will bring the document’s ID inside of the object.
  getSongList(): Observable<Song[]>{
    const ref = collection(this.firestore, "songList");
    const q = query(ref);  // query(ref, where("type", "==", "museum"));
    const data = collectionData(q, {
      idField: 'id',
    });
    return data as Observable<Song[]>;
  }

  /// function get song by id
  getSongDetail(songId: string): Observable<Song>{
    const songRef = doc(this.firestore, `songList/${songId}`);

    return docData(songRef, {idField: 'id'}) as Observable<Song>;
  }

  /// delete function
  deleteSong(songId: string): Promise<void>{
    const songDocRef = doc(this.firestore, `songList/${songId}`);

    return deleteDoc(songDocRef);
  }
}
