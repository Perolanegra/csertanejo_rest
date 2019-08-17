const mongoose = require('../database');

const ProdutoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true,
    },
    descricao: {
        type: String,
        required: false,
    },
    id_valor: {
        type: String,
        required: true,
        unique: true,
    },
    criado_em: {
        type: Date,
        default: Date.now,
    },
    atualizado_em: {
        type: Date,
        default: null,
    },
    deltado_em: {
        type: Date,
        default: null,
    }
});

const Produto = mongoose.model('Produto', ProdutoSchema);

module.exports = Produto;