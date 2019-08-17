const express = require('express');

const ProdutoEntity = require('../models/Produto');

const router = express.Router();

router.post('/create', async (req, res) => {
    const { postData } = req.body;
    try {
        if(await ProdutoEntity.findOne({ postData })) {
            return res.status(400).send({ err: { message: 'Produto já existente.' } });
        }

        const produtos = await ProdutoEntity.create(req.body);

        return res.send({ produtos });
        
    } catch (e) {
        return res.status(400).send({ err: { message: 'Falha ao inserir produto.', e }  });
    }
});

module.exports = (app) => app.use('/produto', router);