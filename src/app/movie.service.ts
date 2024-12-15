import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl: string = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
  private authToken: string =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODhjNDlhYTRkMDRjYmQ5YzE4OGNmZjJhYTRkY2QxOSIsIm5iZiI6MTczNDI1NzkyNS42OTcsInN1YiI6IjY3NWVhZDA1ZDZmNWU4NDU4YjhiMzY0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cYElkzPs3XH72VylhxFsiW8mhRIBi-4FCgOnHOSjV44';
  private localStorageKey: string = 'movies';

  movies: any[] = []; // Holds fetched movies
  classic: any[] = [
    { title: 'Classic Movie 1', overview: 'An old but gold movie.' },
    { title: 'Classic Movie 2', overview: 'A timeless masterpiece.' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Fetch movies from API or fallback to local storage
  async getMovies(): Promise<any[]> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: this.authToken,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data from API');
      }

      const data = await response.json();

      if (isPlatformBrowser(this.platformId)) {
        this.storeMoviesInLocalStorage(data.results);
      }
      this.movies = data.results;
      return data.results;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return this.getMoviesFromLocalStorage();
    }
  }

  // Store movies in local storage (Browser only)
  private storeMoviesInLocalStorage(movies: any[]): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(movies));
    }
  }

  // Get movies from local storage (Browser only)
  private getMoviesFromLocalStorage(): any[] {
    if (isPlatformBrowser(this.platformId)) {
      const storedMovies = localStorage.getItem(this.localStorageKey);
      return storedMovies ? JSON.parse(storedMovies) : [];
    }
    return []; // Return empty array if not in browser
  }

  // Fetch a specific movie by ID
  async getMovieById(movieId: number): Promise<any> {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: this.authToken,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch details for movie ID: ${movieId}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  }

  // Fetch credits (cast and crew) for a specific movie
  async getMovieCredits(movieId: number): Promise<any> {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: this.authToken,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch movie credits');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching credits:', error);
      return { cast: [], crew: [] };
    }
  }
}
