import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { catchError, finalize } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home-defer',
  templateUrl: './home-defer.page.html',
  styleUrls: ['./home-defer.page.scss'],
})
export class HomeDeferPage implements OnInit {

  private currentPage = 1;
  public movies: any[] = [];
  public isLoading = true;
  public error: any;
  public dummyArray = new Array(5);

  public imageBaseUrl = 'https://image.tmdb.org/t/p';

  constructor(private movieService: MovieService) { 
  }

  ///
  /// Load the first page of movies during component initialization
  ///
  ngOnInit() {
    this.loadMovies();
  }

  ///
  /// function load movies
  /// * call function getTopRatedMovies of Movie Service
  ///
  async loadMovies(event?: InfiniteScrollCustomEvent){
    this.error = null;

    // Only show loading indicator on initial load
    if(!event){
      this.isLoading = true;
    }

    // get the next page of movies from MoviesService
    this.movieService.getTopRatedMovies(this.currentPage)
    .pipe(
      finalize(
        () => {
          this.isLoading = false;
        }
      ),
      catchError((err: any) => {
        this.error = err.error.status_message;
        return [];
      })
    )
    .subscribe({
      next:(res) =>{
        // append the result to our movies array
        this.movies.push(...res.results);

        // resolve the infinite scroll promise to tell Ionic that we are done
        event?.target.complete();

        // disable the infinitive scrolll when we reach the end of the list
        if(event){
          event.target.disabled = res.total_pages === this.currentPage;
        }
      }
    }
    )
  }

  /// 
  /// function called by the infinite scroll event handler
  ///
  loadMore(event: InfiniteScrollCustomEvent){
    this.currentPage++;
    this.loadMovies(event);
  }

}
