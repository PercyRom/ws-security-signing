package com.dev.ejbwebservice;

import java.util.List;

import javax.ejb.EJB;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;

/**
 * Session Bean implementation class movieserviceJAXWS
 */

@WebService
public class MovieServiceJAXWS {
	
	@EJB
	MovieData movieData;

    /**
     * Default constructor. 
     */
	public MovieServiceJAXWS() {
        // TODO Auto-generated constructor stub
    }
	
	@WebMethod(operationName= "getMovie")
	@WebResult(name = "returnMovie")
	public Movie getMovie(@WebParam(name="id")int id ) {
		return movieData.getMovie(id);
	}
	
	@WebMethod(operationName= "getMovies")
	@WebResult(name = "returnMovies")
	public List<Movie> getMovie() {
		return movieData.getMovies();
	}

}
