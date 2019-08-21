const express = require('express');

const PedidoModel = require('../models/Pedido');

const router = express.Router();

router.post('/pedir', async (req, res) => {

    try {

        const pedido = await PedidoModel.create(req.body);

        return res.send(pedido);
        
    } catch (e) {
        res.status(400).send({ err: { message: 'Falha ao realizar pedido.', e }});
    }

});

module.exports = (app) => app.use('/pedido', router);