import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  movie: any = {};

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    if (movieId) {
      this.fetchMovieDetails(movieId);
    }
  }

  async fetchMovieDetails(movieId: number): Promise<void> {
    try {
      const movieDetails = await this.movieService.getMovieById(movieId);
      const movieCredits = await this.movieService.getMovieCredits(movieId);

      // Combine movie details with director and cast
      this.movie = {
        ...movieDetails,
        director: movieCredits.crew.find((c: any) => c.job === 'Director')?.name || 'Unknown',
        writer: movieCredits.crew.find((c: any) => c.job === 'Writer')?.name || 'Unknown',
        cast: movieCredits.cast || [],
      };
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  }
}
