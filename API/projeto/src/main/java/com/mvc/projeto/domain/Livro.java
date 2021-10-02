package com.mvc.projeto.domain;

import java.io.Serializable;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class Livro implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idLivro;
	
	private String nome;
	private int anoPublicacao;
	private int numeroPaginas;
	
	private String editora;
	
	@Lob
	private String sinopse;
	
	@Lob
	private String capa;
	
	@ManyToOne
	@JoinColumn(name="idAutor")
	private Autor autor;
	
	@ManyToOne
	@JoinColumn(name="idUser", referencedColumnName="id")
	private Usuario usuario;

	public Livro(int id, String nome, int anoPublicacao, int numeroPaginas, Autor autor, Usuario usuario) {
		this.idLivro = id;
		this.nome = nome;
		this.anoPublicacao = anoPublicacao;
		this.numeroPaginas = numeroPaginas;
		this.autor = autor;
		//this.usuario = usuario;
	}

	public Livro() {
		
	}

	public int getIdLivro() {
		return idLivro;
	}

	public void setIdLivro(int id) {
		this.idLivro = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public int getAnoPublicacao() {
		return anoPublicacao;
	}

	public void setAnoPublicacao(int anoPublicacao) {
		this.anoPublicacao = anoPublicacao;
	}

	public int getNumeroPaginas() {
		return numeroPaginas;
	}

	public void setNumeroPaginas(int numeroPaginas) {
		this.numeroPaginas = numeroPaginas;
	}

	public Autor getAutor() {
		return autor;
	}

	public void setAutor(Autor autor) {
		this.autor = autor;
	}
	
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	
	public Usuario getUsuario() {
	return usuario;
	}
	

	public String getEditora() {
		return editora;
	}

	public void setEditora(String editora) {
		this.editora = editora;
	}

	public String getCapa() {
		return capa;
	}

	public void setCapa(String capa) {
		this.capa = capa;
	}
	
	

	public String getSinopse() {
		return sinopse;
	}

	public void setSinopse(String sinopse) {
		this.sinopse = sinopse;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + idLivro;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Livro other = (Livro) obj;
		if (idLivro != other.idLivro)
			return false;
		return true;
	}

	

}
