package com.mvc.projeto.security;

public class AuthToken {

	public String token;
	
	public AuthToken(String token) {
		super();
		this.token = token;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
	
}
