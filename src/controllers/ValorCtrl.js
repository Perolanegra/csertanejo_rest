const expreess = require('express');

const Valor = require('../models/Valor');

const router = expreess.Router();

router.post('/inserir', async (req, res) => {
    const postData = req.body;
    const sqlParams = { valor_pequeno: postData.valor_pequeno, 
        valor_medio: postData.valor_medio, valor_grande: postData.valor_grande, 
        pontos: postData.pontos };

    let hasData;

    try {
        await Valor.find(sqlParams, (e, resp) => {
            if(e) {
                return res.status(400).send({ err: { message: 'Operação Indisponível no momento.' } });
            }

            hasData = resp.length ? true : false;
        });

        if(hasData) {
            return res.status(400).send({ err: { message: 'Valores já existentes.' } });
        }

        const valores = await Valor.create(req.body);

        return res.send(valores); // Enviando os valores da minha Entidade para a requisição.    

    } catch (e) {
        return res.status(400).send({ err: { message: 'Falha ao inserir Valores;', e }  });
    }
});

router.get('/obterTodos', async (req, res) => {
    try {
        const valores = await Valor.find();

        return res.send(valores);

    } catch (e) {
        return res.status(400).send({ err: { message: 'Falha ao obter Valores;', e }  });
    }
});

router.delete('/delete', async (req, res) => {
    const paramsDelete = req.body;
    
    try {
        const respDelete =  Valor.find({ "_id": paramsDelete.id }).update({ deletado_em: Date.now }).exec();
        
        return res.send(respDelete);
        
    } catch (e) {
        return res.status(400).send({ err: { message: 'Falha em excluir os Produtos.', e }  });
    }
});

// router.delete('/excluirPorId', async (req, res) => {
//     const paramsDelete = req.body;
    
//     try {
//         const respDelete =  Valor.findByIdAndRemove(({ "_id": paramsDelete.id })).exec();
        
//         return res.send({ respDelete });
        
//     } catch (e) {
//         return res.status(400).send({ err: { message: 'Falha em excluir os Produtos.', e }  });
//     }
// });

module.exports = (app) => app.use('/valores', router);