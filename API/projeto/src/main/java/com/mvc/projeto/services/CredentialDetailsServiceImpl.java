package com.mvc.projeto.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.mvc.projeto.domain.Usuario;
import com.mvc.projeto.repositories.UsuarioRepository;
import com.mvc.projeto.security.CredencialSecurityModel;



@Service
public class CredentialDetailsServiceImpl implements UserDetailsService  {


	@Autowired
	private UsuarioRepository usuarioRepository;
		
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Usuario user = usuarioRepository.findByEmail(email);
		if (user == null) {
			throw new UsernameNotFoundException(email);
		}
		return new CredencialSecurityModel(
				user.getId(), user.getEmail(), user.getSenha(),
				user.getNome(), user.getPerfis()
					);
	} 

}
