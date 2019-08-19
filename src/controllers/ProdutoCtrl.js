const express = require('express');

const ProdutoModel = require('../models/Produto');

const router = express.Router();

router.post('/cadastrar', async (req, res) => {
    const postData = req.body;

    let hasData;

    try {
        await ProdutoModel.find(postData, (e, resp) => {
            if(e) {
                return res.status(400).send({ err: { message: 'Operação Indisponível no momento.' } });
            }
            
            hasData = resp.length ? true : false;
        });

        if(hasData) {
            return res.status(400).send({ err: { message: 'Produto já existente.' } });
        }

        const produtos = await ProdutoModel.create(postData);

        return res.send(produtos);
        
    } catch (e) {
        return res.status(400).send({ err: { message: 'Falha ao inserir produto.', e }  });
    }
});

router.get('/obterTodos', async (req, res) => {
    try {
        const produtos = await ProdutoModel.find({ deletado_em: { $exists: true, $in: [null] } });

        return res.send(produtos);
        
    } catch (e) {
        return res.status(400).send({ err: { message: 'Falha em retornar os Produtos.', e }  });
    }
});

router.delete('/delete', async (req, res) => {
    const paramsDelete = req.body;
    
    try {
        const respDelete =  await ProdutoModel.find({ "_id": paramsDelete.id }).update({ deletado_em: Date.now }).exec();
        
        return res.send(respDelete);
        
    } catch (e) {
        return res.status(400).send({ err: { message: 'Falha em deletar o Produto.', e }});
    }
});

router.patch('/atualizar', async (req, res) => {
    try {
        const respAtualizar = await ProdutoModel.updateOne({ deletado_em: null, _id: req.body._id }, { $set: req.body.postData });

        return res.send(respAtualizar);

    } catch (e) {
        return res.status(400).send({ err: { message: 'Falha ao atualizar registro.', e }});
    }
});

/**Recebe da requisição o JSON chave - valor do novo campo do Schema */
router.patch('/addSchemaField', async (req, res) => {
    try {
        const respAdd = await ProdutoModel.updateMany({ deletado_em: null }, { $set: req.body }, { new: true, strict: false });

        return res.send(respAdd);

    } catch (e) {
        return res.status(400).send({ err: { message: 'Falha em adicionar um campo no Schema.', e }  });
    }
});

/**Recebe da requisição o JSON chave - valor do novo campo do Schema */
router.delete('/removeSchemaField', async (req, res) => {
    try {
        const respQuery = await ProdutoModel.updateMany({ deletado_em: null }, { $unset: req.body }, { new: true, strict: false });

        return res.send(respQuery);

    } catch (e) {
        return res.status(400).send({ err: { message: 'Falha em adicionar um campo no Schema.', e }  });
    }
});

/**Exclui o registro através do id passado */
// router.delete('/excluirPorId', async (req, res) => {
//     const paramsDelete = req.body;

//     try {
//         const respDelete = ProdutoModel.findByIdAndRemove(paramsDelete.id).exec();

//         return res.send(respDelete);
        
//     } catch (e) {
//         return res.status(400).send({ err: { message: 'Falha ao excluir o Produto.', e } });
//     }
// });


/**Exclui o Schema corrente */
// router.delete('/remover', async (req, res) => {

//     try {
//         ProdutoModel.collection.drop();

//         return res.send({ msg: 'Removido.' });

//     } catch (e) {
//         return res.status(400).send({ err: { message: 'Falha ao excluir o Model.', e } });
//     }

// });

module.exports = (app) => app.use('/produto', router);