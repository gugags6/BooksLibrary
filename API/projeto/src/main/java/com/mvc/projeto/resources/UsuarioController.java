package com.mvc.projeto.resources;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mvc.projeto.domain.Usuario;
import com.mvc.projeto.exceptions.ObjectNotFoundException;
import com.mvc.projeto.services.UsuarioService;

	
	@RestController
	@RequestMapping(value="/usuarios")
	public class UsuarioController {
		
		@Autowired
		private UsuarioService service;
		
		@RequestMapping(value="", method=RequestMethod.GET)
		public ResponseEntity<List<Usuario>> getAll(){
				
		return ResponseEntity.ok().body(service.getAll());
			
		}
		
		@RequestMapping(value="/email/{email}", method=RequestMethod.GET)
		public ResponseEntity<Usuario> findByEmail(@PathVariable("email") String email){
			Usuario obj = service.findByEmail(email);
			
			
				return ResponseEntity.ok().body(obj);
			
	}
		
		
		@RequestMapping(value="/{id}", method=RequestMethod.GET)
		public ResponseEntity<Optional<Usuario>> findById(@PathVariable("id") int idUser){
			Optional<Usuario> obj = service.getById(idUser);
			
			if(obj.isPresent()==false) {
				throw new ObjectNotFoundException(idUser,new Usuario());
			}else {
				return ResponseEntity.ok().body(obj);
			}
	}
		
		@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
		public ResponseEntity<Boolean> deleteById(@PathVariable ("id") int id) {
			return ResponseEntity.ok().body(service.deleteById(id));
		}
		
		@RequestMapping(value="cadastro", method = RequestMethod.POST)
		public ResponseEntity<Usuario> save(@RequestBody @Valid Usuario usuario){
			return ResponseEntity.ok().body(service.save(usuario));
		}
		@RequestMapping(value="/{id}", method = RequestMethod.PATCH)
		public ResponseEntity<Usuario> update(@RequestBody Usuario usuario, @PathVariable("id")int id){
			return ResponseEntity.ok().body(service.update(usuario, id));
		}

}
