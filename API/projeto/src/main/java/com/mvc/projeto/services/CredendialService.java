package com.mvc.projeto.services;

import org.springframework.security.core.context.SecurityContextHolder;

import com.mvc.projeto.security.CredencialSecurityModel;



public class CredendialService {
	
	//retorna o objeto de quem está logado
	public static CredencialSecurityModel authenticated() {
		try {
			return (CredencialSecurityModel) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		}
		catch (Exception e) {
			return null;
		}
	}
	
}
