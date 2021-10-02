package com.mvc.projeto.services;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mvc.projeto.domain.Aluno;
import com.mvc.projeto.domain.Autor;
import com.mvc.projeto.repositories.AutorRepository;


@Service
public class AutorService {

	
	@Autowired
	AutorRepository autorRepositorio;
	
	public List <Autor> getAll(){
		
		List <Autor> lista = autorRepositorio.findAll();
		
		Comparator<Autor> c = new Comparator<Autor>() {
			@Override
			public int compare(Autor aut1, Autor aut2) {
				return aut1.getNome().toUpperCase().compareTo(aut2.getNome().toUpperCase());
			}
		};
		lista.sort(c);
		
		return lista;
	}
	
public Autor save(Autor autor) {
			
		return autorRepositorio.save(autor);
	}

public Optional<Autor> getById(int id){
	return autorRepositorio.findById(id);
}




public boolean deleteById(int id) {
	autorRepositorio.deleteById(id);
	return true;
}

public Autor update(Autor autor, int id) {
	Optional<Autor> r = autorRepositorio.findById(id);
	
	if(r.isPresent()) {
		r.get().setNome(autor.getNome());
		r.get().setNacionalidade(autor.getNacionalidade());
		return autorRepositorio.save(r.get());
	}else {
		return null;
	}
}

}
	
	

