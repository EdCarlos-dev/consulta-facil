class Usuario {
    constructor(nome, email, senha) {
      this.nome = nome;
      this.email = email;
      this.senha = senha;
    }
  
    validarSenha(senha) {
      return this.senha === senha;
    }
  }
  
  module.exports = Usuario;
  