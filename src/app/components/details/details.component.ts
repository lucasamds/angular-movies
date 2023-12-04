import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{

  movie_id!: number;
  movie!: Movie;
  trailerUrl!: SafeResourceUrl;
  watchlist!: number[];
  rating_stars!: number;
  loading!: boolean;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private sanitizer: DomSanitizer){}

  ngOnInit(): void {
      this.loading = true;
      this.movie_id = Number(this.route.snapshot.paramMap.get('id'));
      this.movieService.getMovie(this.movie_id).subscribe({
        next: (data) => {
          this.movie = data;
          this.setTrailerUrl();
          this.checkWatchlist();
          this.setRating();
          this.stopLoading();
        },
        error: (error) => console.error('Error found.', error)        
      })
  }

  /** Creates the movie trailer URL */
  setTrailerUrl(): void{
    let url: any = this.movie.trailer;
    url = `https://www.youtube.com/embed/${url.split('=')[1]}`;
    this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);        
  }

  /** Recieves the user's watchlist */
  checkWatchlist(): void {
    let user_watchlist = localStorage.getItem('watchlist');
    this.watchlist = user_watchlist? JSON.parse(user_watchlist) : [];
  }

   /** Add a movie on the watchlist */
   addWatch(id: number): void{
    this.watchlist.push(id);
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
  }

  /** Remove one movie from the watchlist */
  removeWatch(id: number): void{
    this.checkWatchlist();
    if(this.watchlist.includes(id)){
      const i = this.watchlist.indexOf(id);
      this.watchlist.splice(i, 1);
    }    
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
  }

  /** Sets movie rating */
  setRating(){
    this.rating_stars = this.movie.rating/2;
  }

  /** Stops loading animation */
  stopLoading(){
    this.loading = false;
  }
}
