const mongoose = require('../database');

const PedidoSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ["aberto", "confirmado", "entregue", "cancelado"]
    },
    data_aberto: {
        type: Date,
        default: Date.now
    },
    data_confirmado: {
        type: Date,
        default: null
    },
    data_entregue: {
        type: Date,
        default: null
    },
    data_cancelado: {
        type: Date,
        default: null
    }, 
    valor: {
        type: Number,
        required: true
    },
    id_usuario: {
        type: String,
        required: true
    },
    id_compra: {
        type: String,
        required: true
    },
    id_produto: {
        type: [String],
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    endereco_lat: {
        type: Number,
        required: true
    },
    endereco_lng: {
        type: Number,
        required: true
    },
    observacao: {
        type: String,
        default: null,
        maxlength: 150
    }   
});

const Pedido = mongoose.model('Pedido', PedidoSchema);

module.exports = Pedido;