import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  movies!: Movie[];
  carousel: string[] = ['spider-man', 'knives-out', 'tenet', 'avengers', 'guardians'];
  dropdown_opt: string[] = ['Title', 'Release Date', 'Rating'];
  dropdown_val: string = 'Title';
  ratings_stars!: number[];
  watchlist!: number[];


  constructor(private movieService: MovieService){}

  ngOnInit(){
    this.movieService.getAllMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.setRatingStars();
        this.createWatchlist();
      }
    })
  }

  /** Sorts the movie array, according to the chosen option*/
  sortMovies(): void{
    if(this.dropdown_val === 'Title'){
      this.movies.sort((a, b) => (a.title > b.title)?1:-1);
    }
    else if(this.dropdown_val === 'Rating'){
      this.movies.sort((a, b) => b.rating - a.rating);
    }
    else if(this.dropdown_val === 'Release Date'){
      this.movies.sort((a,b) => (new Date(a.release_date).getTime() - new Date(b.release_date).getTime()));
    }
    this.setRatingStars();
  }

  /** Sets the number of stars that each movie has based on rating */
  setRatingStars() :void {
    this.ratings_stars = [];
    for(let movie of this.movies){
      this.ratings_stars.push(movie.rating/2)
    }
  }

  /** creates the user watchlist if there's none */
  createWatchlist(): void{
    let user_watchlist = localStorage.getItem('watchlist');
    this.watchlist = user_watchlist? JSON.parse(user_watchlist) : [];
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
  }

  /** Add a movie on the watchlist */
  addWatch(id: number): void{
    this.watchlist.push(id);
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
  }

  /** Remove one movie from the watchlist */
  removeWatch(id: number): void{
    let user_watchlist = localStorage.getItem('watchlist');
    this.watchlist = user_watchlist? JSON.parse(user_watchlist): [];
    if(this.watchlist.includes(id)){
      const i = this.watchlist.indexOf(id);
      this.watchlist.splice(i, 1);
    }    
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
  }
}
