import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiRoot: string = 'http://localhost:3000/movies/';

  constructor(private http: HttpClient) { }

  /** Retrieves all movies from the database */
  getAllMovies(): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.apiRoot);
  }

  /** Retrieves the given id movie from the database */
  getMovie(id: number): Observable<Movie>{
    return this.http.get<Movie>(this.apiRoot.concat(`${id}`));
  }
}
