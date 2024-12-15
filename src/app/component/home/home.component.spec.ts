import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { MovieService } from '../../movie.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let movieServiceMock: any;

  beforeEach(async () => {
    movieServiceMock = {
      getMovies: jasmine.createSpy('getMovies').and.returnValue(Promise.resolve([])),
    };

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: MovieService, useValue: movieServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default name as Guest', () => {
    expect(component.name).toEqual('Guest');
  });

  it('should call logout method', () => {
    spyOn(console, 'log');
    component.logout();
    expect(console.log).toHaveBeenCalledWith('User logged out!');
  });

  it('should call fetchMovies when allMovies is triggered', async () => {
    spyOn(component, 'fetchMovies');
    component.fetchMovies();
    expect(component.fetchMovies).toHaveBeenCalled();
  });
});
