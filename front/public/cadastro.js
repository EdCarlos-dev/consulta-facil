var mysql = require('mysql');
var dbConfig = require('dbconfig.js');

// Conecte-se ao banco de dados
var con = mysql.createConnection(dbConfig);


// Obtém a referência ao formulário de cadastro
var formularioCadastro = document.getElementById('formularioCadastro');

// Chame o método insertPaciente para inserir o paciente no banco de dados
con.connect(function (error) {
  if (error) throw error;
  console.log('Conexão ao banco de dados MySQL bem-sucedida!');

  var nome = document.getElementById('nome').value;
  var email = document.getElementById('email').value;
  var senha = document.getElementById('senha').value;
  var confirmarSenha = document.getElementById('confirmarSenha').value;
  var convenio = document.getElementById('convenio').value;
  var sus = document.getElementById('sus').value;
  var rua = document.getElementById('rua').value;
  var numero = document.getElementById('numero').value;
  var cep = document.getElementById('cep').value;
  var cidade = document.getElementById('cidade').value;
  var estado = document.getElementById('estado').value;
  var rg = document.getElementById('rg').value;
  var cpf = document.getElementById('cpf').value;

  // Validação do CEP, RG e CPF no lado do cliente
  if (!validarCampoNumerico(cep, 8)) {
    console.error('CEP inválido. Por favor, insira um CEP válido com 8 dígitos.');
    return;
  }

  if (!validarCampoNumerico(rg, 9)) {
    console.error('RG inválido. Por favor, insira um RG válido com 9 dígitos.');
    return;
  }

  if (!validarCampoNumerico(cpf, 11)) {
    console.error('CPF inválido. Por favor, insira um CPF válido com 11 dígitos.');
    return;
  }

  // Formatação do RG e CPF
  rg = rg.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
  cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

  // Validação de Senha
  if (senha !== confirmarSenha) {
    console.error('As senhas não coincidem. Por favor, digite senhas iguais nos campos de senha e confirmar senha.');
    return;
  }

  var sql = "INSERT INTO pacientes(nome, email, senha, convenio, sus, rua, numero, cep, cidade, estado, rg, cpf) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  var values = [nome, email, senha, convenio, sus, rua, numero, cep, cidade, estado, rg, cpf];

  con.query(sql, values, function (error, result) {
    if (error) {
      console.error('Erro ao cadastrar paciente:', error);
    } else {
      console.log('Paciente cadastrado com sucesso!', result);

      setTimeout(function () {
        window.location.href = 'login.html'; // Redirecionar para a página de login.html
        // Salvar os dados no localStorage
        localStorage.setItem('nomePaciente', nome);
        localStorage.setItem('emailPaciente', email);
        localStorage.setItem('rg,', rg);
        localStorage.setItem('cpf', email);
        // Adicione outros dados que deseja manter no localStorage após o cadastro
      }, 2000); // Redirecionar após 2 segundos
    }
  });
});

// Função para validar campos numéricos
function validarCampoNumerico(valor, tamanho) {
  return /^\d+$/.test(valor) && valor.length === tamanho;
}