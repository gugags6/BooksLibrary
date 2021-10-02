package com.mvc.projeto.repositories;

import java.util.List;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import com.mvc.projeto.domain.Livro;

@Repository
public interface LivroRepository extends JpaRepository<Livro,Integer> {
	
	@Query(value = "select l.* from livro l where l.id_user = ?1", nativeQuery = true)
	List<Livro> findAllByIdUser(int idUser);
	
//	@Query(value = "select l.* from livro l where l.id_user = ?1")
//	Page<Livro> findAllByIdUser(int idUser, PageRequest pageable);
	
	@Query(value="select * FROM livro l WHERE l.id_user = :id_user" ,nativeQuery = true)
	    Page<Livro> search(
	            @Param("id_user") int id_user, 
	            Pageable pageable);
	
	
	@Query(value = "select l.* from livro l where l.id_user = ?1 and l.id_livro = ?2", nativeQuery = true)
	List<Livro> findByIdUser(int idUser, int idLivro);
}
