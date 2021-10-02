package com.mvc.projeto.services;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;


import com.mvc.projeto.domain.Autor;
import com.mvc.projeto.domain.Livro;
import com.mvc.projeto.domain.Usuario;
import com.mvc.projeto.repositories.LivroRepository;
import com.mvc.projeto.repositories.UsuarioRepository;

@Service
public class LivroService {
	
	@Autowired
	private LivroRepository livroRepository;
	
	@Autowired
	private UsuarioRepository userRepository ;
	
	public List <Livro> findAllByIdUser(int id_user) {
		return livroRepository.findAllByIdUser(id_user);
	}
	
//	public List <Livro> findAllByIdUser(int id_user, Pageable pageable) {
//		return livroRepository.findAllByIdUser(id_user,  pageable);
//	}
	
	//Paginação
		public Page<Livro> findPage(int idUser,int pagina, int qtdLinhas, String direcao, String campo) {
			PageRequest pageRequest = PageRequest.of(pagina, qtdLinhas, Direction.valueOf(direcao), campo);
			
			return  livroRepository.search(idUser,pageRequest);
		}
	
	public List <Livro> getAll(){
		
		List <Livro> lista = livroRepository.findAll();
		
		Comparator<Livro> c = new Comparator<Livro>() {
			@Override
			public int compare(Livro obj1, Livro obj2) {
				return obj1.getNome().toUpperCase().compareTo(obj2.getNome().toUpperCase());
			}
		};
		
		lista.sort(c);
		
		return lista;
	}
	
	
	
	public Livro save(Livro livro) {
		
		String email = livro.getUsuario().getEmail();
		Usuario user = new Usuario();
		
		user = userRepository.findByEmail(email);
		
		livro.setUsuario(user);
				
		return livroRepository.save(livro);
	}

public Optional<Livro> getById(int id){
	return livroRepository.findById(id);
}


public boolean deleteById(int id) {
	livroRepository.deleteById(id);
	return true;
}

public Livro update(Livro livro, int id) {
	Optional<Livro> r = livroRepository.findById(id);
	
	if(r.isPresent()) {
		r.get().setNome(livro.getNome());
		r.get().setNumeroPaginas(livro.getNumeroPaginas());
		r.get().setAnoPublicacao(livro.getAnoPublicacao());
		r.get().setAutor(livro.getAutor());
		r.get().setCapa(livro.getCapa());
		r.get().setSinopse(livro.getSinopse());
		
		return livroRepository.save(r.get());
	}else {
		return null;
	}
}



}
	
	


