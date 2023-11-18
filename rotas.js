const path = require('path');
const express = require('express');

function configurarRotas(app) {
    const router = express.Router();

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '/public/index.html'));
    });

    // Rota para a página de cadastro
    app.get('/cadastro', (req, res) => {
        res.sendFile(path.join(__dirname, '/public/cadastro.html'));
    });

    // Rota para a página de cadastro médico
    app.get('/cadastro-medico', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/cadastromedico.html'));
    });

    // Rota para a página de castro Enfermeiro
    app.get('/cadastro-enfermeiro', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/cadastroenfermeiro.html'));
    });

    // Rota para a página de login
    app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/login.html'));
    });

    // Rota para a página de login médico
    app.get('/loginMedico', (req, res) => {
        res.sendFile(path.join(__dirname, '/public/loginMedico.html'));
    });

    // Rota para a página de login enfermeiro
    app.get('/loginEnfermeiro', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/loginEnfermeiro.html'));
    });

    // Rota para a página de recuperação de senha
    app.get('/recuperar-senha', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/recuperar-senha.html'));
    });

    // Rota para a página de busca
    app.get('/busca', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/busca.html'));
    });
    
    // Rota para a página de medicamentos
    app.get('/medicamentos', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/medicamentos.html'));
    });
    
    // Rota para a página de agendamentos
    app.get('/agendamentos', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/agendamentos.html'));
    });

    // Rota para a página de marcar consulta
    app.get('/marcar-consulta', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/marcarconsulta.html'));
    });
    
    // Rota para a página de perfil do paciente
    app.get('/perfilPaciente', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/perfilPaciente.html'));
    });
    
    // Rota para a página de atendimento do medico
    router.get('/perfil-medico', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/atendimentoMedico.html'));
    });
    
    // Rota para a página de fila de atendimento do enfermeiro
    app.get('/perfil-enfermeiro', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/filaEnfermeiro.html'));
    });
    
    // Adicione outras rotas aqui, se necessário

    app.use('/', router);
}

module.exports = configurarRotas;
