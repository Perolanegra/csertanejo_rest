const express = require('express');

const ProdutoEntity = require('../models/Produto');

const router = express.Router();

router.post('/inserir', async (req, res) => {
    const postData = req.body;

    let hasData;

    try {
        await ProdutoEntity.find(postData, (e, resp) => {
            if(e) {
                return res.status(400).send({ err: { message: 'Operação Indisponível no momento.' } });
            }
            
            hasData = resp.length ? true : false;
        });

        if(hasData) {
            return res.status(400).send({ err: { message: 'Produto já existente.' } });
        }

        const produtos = await ProdutoEntity.create(postData);

        return res.send(produtos);
        
    } catch (e) {
        return res.status(400).send({ err: { message: 'Falha ao inserir produto.', e }  });
    }
});

router.get('/obterTodos', async (req, res) => {
    try {
        const produtos = await ProdutoEntity.find({ deletado_em: null });

        return res.send(produtos);
        
    } catch (e) {
        return res.status(400).send({ err: { message: 'Falha em retornar os Produtos.', e }  });
    }
});

router.delete('/delete', async (req, res) => {
    const paramsDelete = req.body;
    
    try {
        const respDelete =  ProdutoEntity.find({ "_id": paramsDelete.id }).update({ deletado_em: Date.now }).exec();
        
        return res.send(respDelete);
        
    } catch (e) {
        return res.status(400).send({ err: { message: 'Falha em deletar o Produto.', e }  });
    }
});

// router.delete('/excluirPorId', async (req, res) => {
//     const paramsDelete = req.body;

//     try {
//         const respDelete = ProdutoEntity.findByIdAndRemove(paramsDelete.id).exec();

//         return res.send({ respDelete });
        
//     } catch (e) {
//         return res.status(400).send({ err: { message: 'Falha ao excluir o Produto.', e } });
//     }
// });

// router.delete('/remover', async (req, res) => {

//     try {
//         ProdutoEntity.collection.drop();

//         return res.send({ msg: 'Removido.' });

//     } catch (e) {
//         return res.status(400).send({ err: { message: 'Falha ao excluir o Model.', e } });
//     }

// });

module.exports = (app) => app.use('/produto', router);