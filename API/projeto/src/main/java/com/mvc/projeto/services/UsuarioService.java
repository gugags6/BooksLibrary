package com.mvc.projeto.services;

import java.sql.SQLIntegrityConstraintViolationException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.mvc.projeto.domain.Usuario;
import com.mvc.projeto.exceptions.UserAlreadyExistsException;
import com.mvc.projeto.repositories.UsuarioRepository;

@Service
public class UsuarioService {
	
	@Autowired
	UsuarioRepository usuarioRepositorio;
	
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder; 
	

	public List <Usuario> getAll(){
		List <Usuario> lista = usuarioRepositorio.findAll();
		
		return lista;
	}
	
	public Usuario findByEmail(String email) {
		return usuarioRepositorio.findByEmail(email);
	}
	
	public Usuario save(Usuario usuario) {
		
		if(usuarioRepositorio.findByEmail(usuario.getEmail())!=null) {
			throw new UserAlreadyExistsException(usuario.getEmail());
		}else {
			usuario.setSenha(bCryptPasswordEncoder.encode(usuario.getSenha()));
			
			return usuarioRepositorio.save(usuario);
		}
		
			
			
	
	}

	public Optional<Usuario> getById(int id){
		return usuarioRepositorio.findById(id);
}


	public boolean deleteById(int id) {
		usuarioRepositorio.deleteById(id);
		return true;
}

public Usuario update(Usuario usuario, int id) {
	Optional<Usuario> r = usuarioRepositorio.findById(id);
	
	if(r.isPresent()) {
		r.get().setNome(usuario.getNome());
		r.get().setSenha(usuario.getSenha());
		return usuarioRepositorio.save(r.get());
	}else {
		return null;
	}
}

}
