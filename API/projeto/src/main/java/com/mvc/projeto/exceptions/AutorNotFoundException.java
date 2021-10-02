package com.mvc.projeto.exceptions;

public class AutorNotFoundException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public AutorNotFoundException(int id) {
		super( "Autor com id " + id + "não foi localizado");
 	}
}
