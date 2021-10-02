package com.mvc.projeto.resources;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mvc.projeto.domain.Autor;
import com.mvc.projeto.domain.Livro;
import com.mvc.projeto.exceptions.AutorNotFoundException;
import com.mvc.projeto.exceptions.ObjectNotFoundException;
import com.mvc.projeto.services.LivroService;

@RestController
@RequestMapping(value="/livros")
public class LivroController {

	@Autowired
	private LivroService service;

	@RequestMapping(value="", method=RequestMethod.GET)
	public ResponseEntity<List<Livro>> getAll(){

		return ResponseEntity.ok().body(service.getAll());

	}

	//Pegar todos os livros de um usuário específico
	@RequestMapping(value="/user/{id}", method=RequestMethod.GET)
	public ResponseEntity<List<Livro>> findAllByIdUser(@PathVariable("id") int id_user){
		List<Livro> lista = service.findAllByIdUser(id_user);

		return ResponseEntity.ok().body(lista);
	}
	
//	@RequestMapping(value="/user/{id}", method=RequestMethod.GET)
//	public ResponseEntity<List<Livro>> findAllByIdUser(@PathVariable("id") int id_user, Pageable pegeable){
//		List<Livro> lista = service.findAllByIdUser(id_user,pegeable);
//
//		return ResponseEntity.ok().body(lista);
//	}
	
	//Paginação
		@RequestMapping(value = "/user/page", method = RequestMethod.GET)
		public ResponseEntity<Page<Livro>> findPage(@RequestParam(value = "pagina", defaultValue = "0") int pagina,
				@RequestParam(value = "qtdLinhas", defaultValue = "5") int qtdLinhas,
				@RequestParam(value = "direcao", defaultValue = "ASC") String direcao,
				@RequestParam(value = "campo", defaultValue = "id_livro") String campo,
				@RequestParam(value = "idUser") int id_user) {


			Page<Livro> pageLivros = service.findPage( id_user,pagina,
					qtdLinhas, direcao,campo);

			return ResponseEntity.ok().body(pageLivros);
		}
		
		//Retornar quantidade de páginas da API
		@RequestMapping(value = "/user/numpage", method = RequestMethod.GET)
		public ResponseEntity<Integer> numeroPaginasLivros(@RequestParam(value = "pagina", defaultValue = "0") int pagina,
				@RequestParam(value = "qtdLinhas", defaultValue = "5") int qtdLinhas,
				@RequestParam(value = "direcao", defaultValue = "ASC") String direcao,
				@RequestParam(value = "campo", defaultValue = "id_livro") String campo,
				@RequestParam(value = "idUser") int id_user){
			
			Page<Livro> pageLivros = service.findPage( id_user,pagina,
					qtdLinhas, direcao,campo);

			return ResponseEntity.ok().body(pageLivros.getTotalPages());
			
		}

	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<Optional<Livro>> findById(@PathVariable("id") int idLivro){
		Optional<Livro> obj = service.getById(idLivro);

		if(obj.isPresent()==false) {
			throw new ObjectNotFoundException(idLivro,new Livro());
		}else {
			return ResponseEntity.ok().body(obj);
		}
	}

	

	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Boolean> deleteById(@PathVariable ("id") int id) {
		return ResponseEntity.ok().body(service.deleteById(id));
	}

	@RequestMapping(value="", method = RequestMethod.POST)
	public ResponseEntity<Livro> save(@RequestBody Livro livro){
		return ResponseEntity.ok().body(service.save(livro));
	}
	@RequestMapping(value="/{id}", method = RequestMethod.PATCH)
	public ResponseEntity<Livro> update(@RequestBody Livro livro, @PathVariable("id")int id){
		return ResponseEntity.ok().body(service.update(livro, id));
	}

}
