import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit{
  watchlist!: number[];
  movies!: Movie[];

  constructor(private movieService: MovieService){}

  ngOnInit(): void {
      this.getWatchlist()
      this.movieService.getAllMovies().subscribe({
        next: (data) => {
          this.movies = data;
          this.filterMovies();
        },
        error: (error) => console.error('Error found', error)
      })
  }

  /** Recieves user's watchlist  */
  getWatchlist(): void{
    let user_watchlist = localStorage.getItem('watchlist');
    this.watchlist = user_watchlist? JSON.parse(user_watchlist) : [];
  }

  /** Filter movies on watchlist */
  filterMovies(): void{
    this.movies = this.movies.filter((movie) => this.watchlist.includes(movie.id));
  }
}
