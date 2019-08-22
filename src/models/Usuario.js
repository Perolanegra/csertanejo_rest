const mongoose = require('../database');

const UsuarioSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    sobrenome: {
        type: String,
        required: false
    }
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;

