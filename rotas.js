const path = require('path');
const express = require('express');

function configurarRotas(app) {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '/public/index.html'));
    });

    // Rota para a página de cadastro
    router.get('/cadastro', (req, res) => {
        res.sendFile(path.join(__dirname, '/public/cadastro.html'));
    });

    // Rota para a página de cadastro médico
    router.get('/cadastro-medico', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/cadastromedico.html'));
    });

    // Rota para a página de castro Enfermeiro
    router.get('/cadastro-enfermeiro', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/cadastroenfermeiro.html'));
    });

    // Rota para a página de login
    router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/login.html'));
    });

    // Rota para a página de login médico
    router.get('/loginMedico', (req, res) => {
        res.sendFile(path.join(__dirname, '/public/loginMedico.html'));
    });

    // Rota para a página de login enfermeiro
    router.get('/loginEnfermeiro', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/loginEnfermeiro.html'));
    });

    // Rota para a página de recuperação de senha
    router.get('/recuperar-senha', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/recuperar-senha.html'));
    });

    // Rota para a página de busca
    router.get('/busca', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/busca.html'));
    });
    
    // Rota para a página de medicamentos
    router.get('/medicamentos', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/medicamentos.html'));
    });
    
    // Rota para a página de agendamentos
    router.get('/agendamentos', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/agendamentos.html'));
    });

    // Rota para a página de marcar consulta
    router.get('/marcar-consulta', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/marcarconsulta.html'));
    });
    
    // Rota para a página de perfil do paciente
    router.get('/perfilPaciente', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/perfilPaciente.html'));
    });
    
    // Rota para a página de atendimento do medico
    router.get('/perfil-medico', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/atendimentoMedico.html'));
    });
    
    // Rota para a página de fila de atendimento do enfermeiro
    router.get('/perfil-enfermeiro', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/filaEnfermeiro.html'));
    });
    
    // Adicione outras rotas aqui, se necessário

    app.use('/', router);
}

module.exports = configurarRotas;
