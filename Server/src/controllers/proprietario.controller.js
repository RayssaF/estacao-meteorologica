const db = require("../models");
const Proprietario = db.proprietario;

exports.getProprietarios = async () => {
    data = await Proprietario.findAll();
    return data;
}

