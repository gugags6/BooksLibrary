package com.mvc.projeto.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mvc.projeto.domain.Autor;


@Repository
public interface AutorRepository extends JpaRepository<Autor,Integer> {

}
