package com.mvc.projeto.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mvc.projeto.domain.Aluno;
import com.mvc.projeto.services.AlunoService;


@RestController
@RequestMapping(value="/alunos")
public class AlunoController {
	
	@Autowired
	private AlunoService service;
	
	@RequestMapping(value="", method=RequestMethod.GET)
	public ResponseEntity<List<Aluno>> getAll(){
		return ResponseEntity.ok().body(service.getAll());
	}
	
	@RequestMapping(value="", method = RequestMethod.POST)
	public ResponseEntity<Aluno> save(@RequestBody Aluno aluno){
		return ResponseEntity.ok().body(service.save(aluno));
	}

}
