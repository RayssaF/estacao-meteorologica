const db = require("../models");
const Evento = db.evento;

exports.create = async (evento) =>{
    try {
        await Evento.create(evento);
        console.log("Evento atualizado com sucesso!");   
    } catch (error) {
        console.error("Erro ao adicionar evento!" + error);
    }
}