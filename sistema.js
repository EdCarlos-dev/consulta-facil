class Sistema {
    constructor() {
      this.usuarios = [];
    }
  
    adicionarUsuario(usuario) {
      this.usuarios.push(usuario);
    }
  
    buscarUsuarioPorNome(nome) {
      return this.usuarios.find(usuario => usuario.nome === nome);
    }
  
    removerUsuario(usuario) {
      const index = this.usuarios.indexOf(usuario);
      if (index !== -1) {
        this.usuarios.splice(index, 1);
      }
    }
  
    login(email, senha) {
      return this.usuarios.find(usuario => usuario.email === email && usuario.senha === senha);
    }
  }
  
  module.exports = Sistema;
  