/*
ionic g service serivces/movie

Now we can create a new service to fetch the movie data from the API.
Services structure our Angular app, split up view and business logic and make it easy to share data between components.
let’s implement our service to make two API calls inside the src/app/services/movie.service.ts
*/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { ApiResult, MovieResult } from './interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  ///
  /// * Get a list of movies ordered by popularity.
  /// https://developer.themoviedb.org/reference/movie-popular-list
  ///
  getTopRatedMovies(page = 1): Observable<ApiResult>{
    return this.http
    .get<ApiResult>(`${environment.baseURL}/movie/popular?page=${page}&api_key=${environment.apiKey}`)
    .pipe(
      // Simulate slow network
      delay(2000)
    );
  }

  ///
  /// Get the top level details of a movie by ID
  /// https://developer.themoviedb.org/reference/movie-details
  ///
  getMovieDetails(id: string): Observable<MovieResult>{
    return this.http.get<MovieResult>(`${environment.baseURL}/movie/${id}?api_key=${environment.apiKey}`);
  }
}
