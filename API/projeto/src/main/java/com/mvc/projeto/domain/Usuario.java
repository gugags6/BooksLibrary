package com.mvc.projeto.domain;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.mvc.projeto.enums.Perfil;
import com.sun.istack.NotNull;

@Entity
//@Table(name = "usuario")
@Table(name = "usuario", uniqueConstraints={@UniqueConstraint(columnNames={"email"})})
public class Usuario implements Serializable {
	
		private static final long serialVersionUID = 1L;

		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
		@PrimaryKeyJoinColumn
		@SequenceGenerator(sequenceName = "usuario_seq", allocationSize = 1, name = "USUARIO_NAME_SEQ")
		private int id; 

		@NotNull
		private String nome;

		 @Column(unique=true)
		private String email;
		
		
		private String senha;

		@DateTimeFormat(pattern = "dd/MM/yy")
		@Temporal(TemporalType.DATE)
		@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-dd-MM")
		private Date dataDeNascimento;
		
		private String endereco;
		
		private String estado;
		
		private String cidade;
		
		
		@ElementCollection(fetch=FetchType.EAGER)
		@CollectionTable(name="PERFIS")
		private Set<Integer> perfis = new HashSet<>();
		
	
		
		public Usuario() {
			addPerfil(Perfil.CLIENTE);
		}
		
		public void addPerfil(Perfil perfil) {
			perfis.add(perfil.getCod());
		}
		
		public Set<Perfil> getPerfis() {
			return perfis.stream().map(x -> Perfil.toEnum(x)).collect(Collectors.toSet());
		}
		
		public int getId() {
			return id;
		}
	 
		public String getNome() {
			return nome;
		}

		public void setNome(String nome) {
			this.nome = nome;
		}

		public String getSenha() {
			return senha;
		}

		public void setSenha(String senha) {
			this.senha = senha;
		}


		public Date getDataDeNascimento() {
			return dataDeNascimento;
		}

		public void setDataDeNascimento(Date dataDeNascimento) {
			this.dataDeNascimento = dataDeNascimento;
		}


		public void setId(int id) {
			this.id = id;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}
		
		



		public String getEndereco() {
			return endereco;
		}

		public void setEndereco(String endereco) {
			this.endereco = endereco;
		}

		public String getEstado() {
			return estado;
		}

		public void setEstado(String estado) {
			this.estado = estado;
		}

		public String getCidade() {
			return cidade;
		}

		public void setCidade(String cidade) {
			this.cidade = cidade;
		}

		public Usuario(int id, String nome, String email, String senha, Date dataDeNascimento, String endereco,
				String estado, String cidade) {
			super();
			this.id = id;
			this.nome = nome;
			this.email = email;
			this.senha = senha;
			this.dataDeNascimento = dataDeNascimento;
			this.endereco = endereco;
			this.estado = estado;
			this.cidade = cidade;
		}

		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + ((dataDeNascimento == null) ? 0 : dataDeNascimento.hashCode());
			result = prime * result + ((email == null) ? 0 : email.hashCode());
			result = prime * result + id;
		
			result = prime * result + ((nome == null) ? 0 : nome.hashCode());
			result = prime * result + ((perfis == null) ? 0 : perfis.hashCode());
			result = prime * result + ((senha == null) ? 0 : senha.hashCode());
		
		
			return result;
		}

}
