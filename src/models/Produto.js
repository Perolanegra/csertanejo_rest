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
    img: {
        type: String,
        default: null
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
    deletado_em: {
        type: Date,
        default: null,
    },
    likes: {
        type: Number,
        default: 0
    },
    valores: [Number]
});

const Produto = mongoose.model('Produto', ProdutoSchema);

module.exports = Produto;