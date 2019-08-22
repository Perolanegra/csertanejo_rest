const express = require('express');

const ProductModel = require('../models/Product');

const router = express.Router();

/**Rota que insere um novo documento de produto */
router.post('/insert', async (req, res) => {
    const postData = req.body;
    let hasData;

    try {
        await ProductModel.find(postData, (e, resp) => {
            if(e) {
                return res.status(400).send({ err: { message: 'Operation Currently Unavailable.', e } });
            }
            
            hasData = resp.length ? true : false;
        });

        if(hasData) {
            return res.status(409).send({ err: { message: 'Existing product.' } });
        }

        const produtos = await ProductModel.create(postData);

        return res.send(produtos);
        
    } catch (e) {
        return res.status(400).send({ err: { message: 'Failed to insert products.', e }  });
    }
});

/**Rota que obtém todos os Produtos */
router.get('', async (req, res) => { // nodemon
    try {
        const produtos = await ProductModel.find({ deletado_em: { $exists: true, $in: [null] } });
        
        return res.send(produtos);
        
    } catch (e) {
        return res.status(400).send({ err: { message: 'Failed to return products.', e }  });
    }
});

router.post('/filter', async (req, res) => {
    try {
        const products = await ProductModel.find(req.body);
        
        return res.send(products);
        
    } catch (e) {
        return res.status(400).send({ err: { message: 'Failed to return products.', e }  });
    }
});

/** 
 * @description Rota que inativa o registro através do id
 * @param _id
 * @example Recebe da requisição o atribudo _id.
 * @author igor.silva
 * */
router.delete('/:id', async (req, res) => {
    try {
        const respDelete =  await ProductModel.find({ _id: req.params.id }).update({ deletado_em: Date.now }).exec();
        
        return res.send(respDelete);
        
    } catch (e) {
        return res.status(400).send({ err: { message: 'Failed to delete product.', e }});
    }
});

/** 
 * @description Rota que atualiza algum valor, ou valores de um documento pelo id
 * @param _id
 * @param { likes: 5 }
 * @example Recebe da requisição um atributo JSON postData contendo chave: valor do novo campo do Schema.
 * @author igor.silva
 * */
router.patch('/atualizarPorId', async (req, res) => {
    try {
        const respAtualizar = await ProductModel.updateOne({ deletado_em: null, _id: req.body._id }, { $set: req.body.postData });

        return res.send(respAtualizar);

    } catch (e) {
        return res.status(400).send({ err: { message: 'Failed to update data.', e }});
    }
});

/** 
 * @description Rota que adiciona um campo novo no documento.
 * @param { novo_campo: "valor_campo" }
 * @example Recebe da requisição o JSON chave: valor do novo campo do Schema.
 * @author igor.silva
 * */
router.patch('/addSchemaField', async (req, res) => {
    try {
        const respAdd = await ProductModel.updateMany({ deletado_em: null }, { $set: req.body }, { new: true, strict: false });

        return res.send(respAdd);

    } catch (e) {
        return res.status(400).send({ err: { message: ' Failed to add a field in Schema.', e }  });
    }
});

/**Recebe da requisição o JSON chave - valor do novo campo do Schema */
router.delete('/removeSchemaField', async (req, res) => {
    try {
        const respQuery = await ProductModel.updateMany({ deletado_em: null }, { $unset: req.body }, { new: true, strict: false });

        return res.send(respQuery);

    } catch (e) {
        return res.status(400).send({ err: { message: ' Failed to add a field in Schema.', e }  });
    }
});

/**Exclui o registro através do id passado */
// router.delete('/excluirPorId', async (req, res) => {
//     const paramsDelete = req.body;

//     try {
//         const respDelete = ProductModel.findByIdAndRemove(paramsDelete.id).exec();

//         return res.send(respDelete);
        
//     } catch (e) {
//         return res.status(400).send({ err: { message: 'Falha ao excluir o Produto.', e } });
//     }
// });


/**Exclui o Schema corrente */
// router.delete('/remover', async (req, res) => {

//     try {
//         ProductModel.collection.drop();

//         return res.send({ msg: 'Removido.' });

//     } catch (e) {
//         return res.status(400).send({ err: { message: 'Falha ao excluir o Model.', e } });
//     }

// });
// Person.watch().on('change', data => console.log(new Date(), data));

module.exports = (app) => app.use('/products', router);