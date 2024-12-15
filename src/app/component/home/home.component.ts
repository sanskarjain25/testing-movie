import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { MovieService } from '../../movie.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies: any[] = []; // Original list of movies
  filteredMovies: any[] = []; // Filtered list for search
  isOnline: boolean = true; // Default value for online status
  searchTerm: string = ''; // For search functionality
  name: string = 'Guest'; // Default username

  constructor(
    private movieService: MovieService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // To check the platform
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Only runs in browser
      this.isOnline = navigator.onLine;
    } else {
      // Fallback for SSR or non-browser environments
      this.isOnline = false;
    }
    this.fetchMovies();
  }

  async fetchMovies(): Promise<void> {
    try {
      this.movies = await this.movieService.getMovies();
      this.filteredMovies = this.movies; // Initialize filteredMovies
      
      if (typeof window !== 'undefined' && localStorage) {
        // Check if running in browser and localStorage exists
        this.name = localStorage.getItem('currentUserName') || 'GUEST';
      } else {
        this.name = 'GUEST';
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }
  

  filterMovies(): void {
    // Filters the movie list based on the search term
    this.filteredMovies = this.movies.filter((movie) =>
      movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  logout(): void {
    // Clear any user-related data (if applicable)
    console.log('User logged out');
    // Redirect to Login page
    this.router.navigate(['/login']);
  }

  openMovieDetails(movieId: number): void {
    // Navigates to the movie details page
    this.router.navigate(['/movie-details', movieId]);
  }
}
