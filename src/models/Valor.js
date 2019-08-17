const mongoose = require('../database');

const ValorSchema = new mongoose.Schema({
    valor_pequeno: {
        type: Number,
        required: true
    },
    valor_medio: {
        type: Number,
        required: true
    },
    valor_grande: {
        type: Number,
        required: true
    },
    pontos: {
        type: Number,
        required: true
    },
    criado_em: {
        type: Date,
        default: Date.now,
    },
    atualizado_em: {
        type: Date,
        default: null,
    },
    deletado_em: {
        type: Date,
        default: null,
    }
});

const Valor = mongoose.model('Valor', ValorSchema);

module.exports = Valor;