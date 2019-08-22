const mongoose = require('../database');

const ProductSchema = new mongoose.Schema({
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
    valores: {
        type: [Number],
        required: true
    },
    tamanho: {
        type: [String],
        required: true
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;