package com.dev.ejbwebservice;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.ejb.Singleton;


/**
 * Session Bean implementation class MovieData
 */
@Singleton
public class MovieData {

	
	private List<Movie> movies;
	
    /**
     * Default constructor. 
     */
    public MovieData() {
        // TODO Auto-generated constructor stub
    }

    @PostConstruct
    public void initial(){
    	movies = new ArrayList<Movie>();
    	
    	movies.add(new Movie(1, "title1", 1990));
    	movies.add(new Movie(2, "title2", 2000));
    	movies.add(new Movie(3, "title3", 2016));
    }

	public List<Movie> getMovies() {
		return movies;
	}
    
    
    public Movie getMovie(int id){
    	Movie retmovie = null;
    	for (Movie movie : movies) {
			if(movie.getId() == id){
				retmovie = movie;
			}
		}
    	return retmovie;
    }
    
}