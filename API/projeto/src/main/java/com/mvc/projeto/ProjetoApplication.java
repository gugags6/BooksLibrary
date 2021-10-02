package com.mvc.projeto;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.mvc.projeto.domain.Usuario;
import com.mvc.projeto.enums.Perfil;
import com.mvc.projeto.repositories.UsuarioRepository;

@SpringBootApplication
public class ProjetoApplication {
	
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder; 

	public static void main(String[] args) {
		SpringApplication.run(ProjetoApplication.class, args);
	}
	
	@Bean
	CommandLineRunner init(UsuarioRepository userRepository,  PasswordEncoder passEncoder) {
		return args->{
			incluiUser(userRepository, passEncoder);
		};
	}
	
	private void incluiUser(UsuarioRepository userRepo, PasswordEncoder passEncoder) throws ParseException {
		
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		Date dataDeNascimento = sdf.parse("03/02/1993");
		 
		
		Usuario u1 = new Usuario();
	
	
		u1.setDataDeNascimento(dataDeNascimento);
		u1.setEmail("bdd@a.com");
		u1.setNome("Usuario 01");
		u1.setSenha(bCryptPasswordEncoder.encode("123"));
		u1.setCidade("Santana");
		
		
		
		u1.addPerfil(Perfil.ADMIN);
		
		//userRepo.save(u1);
	}

}
