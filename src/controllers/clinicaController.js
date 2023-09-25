const clinicaService = require('../services/clinicaService');

module.exports = {
    buscarPacientes: async (req, res)=> {
        let json = {error:'', result:[]};

        let clinica = await clinicaService.buscarPacientes();

        for(let i in clinica){
            json.result.push({
                nome: clinica [i].nome,
                email: clinica[i].email,
                senha: clinica[i].senha,
                convenio: clinica[i].convenio,
                sus: clinica[i].sus
            });
        }
        res.json(json);
    }
}