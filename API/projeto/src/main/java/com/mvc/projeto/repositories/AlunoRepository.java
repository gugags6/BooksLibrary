package com.mvc.projeto.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mvc.projeto.domain.Aluno;



@Repository
public interface AlunoRepository extends JpaRepository<Aluno,Integer> {
	
}