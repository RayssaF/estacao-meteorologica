const db = require("../models");
const Marca = db.marca;

exports.getMarcas = async () => {
    data = await Marca.findAll();
    return data;
}

