const db = require('../dbconfig');

module.exports = {
    buscarPacientes: () =>{
        return new Promise((aceito, rejeitado)=>{
           
            db.query('SELECT * FROM pacientes', (error, results)=>{
                if(error) {rejeitado(error); return; }
                aceito (results);
            });
        });
    }
};