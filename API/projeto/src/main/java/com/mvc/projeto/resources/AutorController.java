package com.mvc.projeto.resources;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mvc.projeto.domain.Autor;
import com.mvc.projeto.exceptions.AutorNotFoundException;
import com.mvc.projeto.services.AutorService;

@RestController
@RequestMapping(value="/autores")
public class AutorController {
	
	@Autowired
	private AutorService service;
	
	@RequestMapping(value="", method=RequestMethod.GET)
	public ResponseEntity<List<Autor>> getAll(){
			
	return ResponseEntity.ok().body(service.getAll());
		
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<Optional<Autor>> findById(@PathVariable("id") int idAutor){
		Optional<Autor> obj = service.getById(idAutor);
		
		if(obj.isPresent()==false) {
			throw new AutorNotFoundException(idAutor);
		}else {
			return ResponseEntity.ok().body(obj);
		}
}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Boolean> deleteById(@PathVariable ("id") int id) {
		return ResponseEntity.ok().body(service.deleteById(id));
	}
	
	@RequestMapping(value="", method = RequestMethod.POST)
	public ResponseEntity<Autor> save(@RequestBody Autor autor){
		return ResponseEntity.ok().body(service.save(autor));
	}
	@RequestMapping(value="/{id}", method = RequestMethod.PATCH)
	public ResponseEntity<Autor> update(@RequestBody Autor autor, @PathVariable("id")int id){
		return ResponseEntity.ok().body(service.update(autor, id));
	}

}
