package pe.com.wss.proj.main;

import java.rmi.RemoteException;

import pe.com.wss.proj.service.Persona;
import pe.com.wss.proj.service.WSSPersonalProxy;

public class Personas {

	public static void main(String[] args) {
		WSSPersonalProxy personal = new WSSPersonalProxy();

		try {
			String saludo = personal.getSaludo("Percy Romero");
			
			System.out.println(String.valueOf("\n").concat(saludo));
			
			
			Persona[] personas = personal.getPersonas();
			for (Persona persona : personas) {
				System.out.print(persona.getNombre() + " \t| ");
				System.out.print(persona.getApellido() + " \t| ");
				System.out.print(persona.getEdad()+ " \t| ");
				System.out.println(persona.getEmail());
			}

		} catch (RemoteException e) {
			e.printStackTrace();
		}
	}
}
