package pe.com.wss.proj.service;

import java.util.ArrayList;
import java.util.List;

import javax.jws.WebMethod;
import javax.jws.WebResult;
import javax.jws.WebService;

import pe.com.wss.proj.entity.Persona;

@WebService
public class WSSPersonal {

	@WebMethod
	public String getSaludo(String name) {
		return "Buenas Tardes, " + name + ".";
	}

	@WebMethod(operationName = "getPersonas")
	@WebResult(name = "persona")
	public List<Persona> getNames() {
		List<Persona> ls = new ArrayList<>();

		ls.add(new Persona("Juan", "Ernesto", 23, "jernesto@gmail.com"));
		ls.add(new Persona("Jose", "Carrera", 44, "jcarrera@gmail.com"));
		ls.add(new Persona("Fredie", "Romero", 45, "fromero@gmail.com"));
		ls.add(new Persona("Abdira", "Julian", 23, "ajulian@gmail.com"));
		ls.add(new Persona("Joel", "Kritddira", 19, "jkritddira@gmail.com"));

		return ls;
	}
}
