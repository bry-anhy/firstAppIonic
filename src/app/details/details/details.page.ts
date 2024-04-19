import { Component, Input, OnInit, WritableSignal, signal } from '@angular/core';
import { addIcons } from 'ionicons';
import { MovieResult } from 'src/app/services/interface';
import { MovieService } from 'src/app/services/movie.service';
import { cashOutline, calendarOutline, cash } from 'ionicons/icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  public imageBaseUrl = 'https://image.tmdb.org/t/p';

  //   Not really required here, but I wanted to show you how to use Signals! The usage is really easy:
  // Create a new Signal with signal<T>(initialValue)
  // Set the value with set(newValue)
  // Get the value by calling the signal()
  public movie: WritableSignal<MovieResult | null> = signal<MovieResult | null>(
    null,
  );

  /// ************************************************
  /// For use @Input id
  /// (3). Define @Input set id in here
  /// ******************************************************
  @Input()
  set id(movieId: string) {
    // This is just to show Signal usage
    // You could also just assign the value to a variable directly
    this.movieService.getMovieDetails(movieId).subscribe((movie) => {
      this.movie.set(movie);
    });
  }

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {
    //
    // * ************************************************
    // NOTE: If you do not use @Input id
    //       We can use : this.route.snapshot.paramMap.get('id')
    //       And remove all step (1), (2) in app.module.ts
    //                           (3) in details.page.ts 
    // * ************************************************
    //
    // const movieId: string = this.route.snapshot.paramMap.get('id') ?? "";
    // this.movieService.getMovieDetails(movieId).subscribe((movie) => {
    //   this.movie.set(movie);
    // });
    // * ************************************************

    // Almost forgot another change of Ionic standalone components: We can manually add the icons we need to the addIcons function, 
    // which will then be included in the final bundle.
    // Now we can use the movie signal in our view to show the movie details.
    // We will also use the new control flow again and cast the movie signal to a variable with as movie to make it easier to work with.
    addIcons(
      { cashOutline, calendarOutline }
    );
  }

  ngOnInit() {
  }

}
