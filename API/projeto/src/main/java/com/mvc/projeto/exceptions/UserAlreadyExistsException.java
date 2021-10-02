package com.mvc.projeto.exceptions;

public class UserAlreadyExistsException extends RuntimeException{
	
	private static final long serialVersionUID = 1L;

	public UserAlreadyExistsException(String email) {
		super( "Autor com email " + email + "já existe no banco de dados");
 	}

}
