package com.mvc.projeto.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.mvc.projeto.domain.Aluno;
import com.mvc.projeto.repositories.AlunoRepository;



@Service
public class AlunoService {
	
	@Autowired
	private AlunoRepository repo;
	
	public List <Aluno> getAll(){
		List <Aluno> lista = repo.findAll();
		
		return lista;
	}
	
public Aluno save(Aluno aluno) {
				
		return repo.save(aluno);
	}
}