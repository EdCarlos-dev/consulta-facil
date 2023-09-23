class Sistema {
    constructor() {
      this.pacientes = [];
    }
  
    adicionarPacientes(pacientes) {
      this.pacientes.push(pacientes);
    }
  
    buscarPacientesPorNome(nome) {
      return this.pacientes.find(this.pacientes = pacietes.nome === nome);
    } 
  
    removerPacientes(pacientes) {
      const index = this.pacientes.indexOf(pacientes);
      if (index !== -1) {
        this.pacientes.splice(index, 1);
      }
    }
  
    login(email, senha) {
      return this.pacientes.find(pacientes => pacientes.nome === nome && pacientes.email === email && pacientes.senha === senha);
    }
  }
  
  module.exports = Sistema;
  