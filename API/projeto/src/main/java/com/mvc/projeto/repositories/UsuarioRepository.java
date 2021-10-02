package com.mvc.projeto.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mvc.projeto.domain.Livro;
import com.mvc.projeto.domain.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,Integer> {
	
	public Usuario findByEmail(String email);
}
