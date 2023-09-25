const express = require('express');
const router = express.Router();

const clinicaController = require('./controllers/clinicaController');

router.get('/clinica', clinicaController.buscarPacientes);


module.exports = router;