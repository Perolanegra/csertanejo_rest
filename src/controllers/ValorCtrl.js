const expreess = require('express');

const ValorEntity = require('../models/Valor');

const router = expreess.Router();

router.post('/create', async (req, res) => {
    const postData = req.body;
    const sqlParams = { valor_pequeno: postData.valor_pequeno, 
        valor_medio: postData.valor_medio, valor_grande: postData.valor_grande, 
        pontos: postData.pontos };
        
    let hasData;

    try {
        await ValorEntity.find(sqlParams, (e, resp) => {
            if(e) {
                return res.status(400).send({ err: { message: 'Operação Indisponível no momento.' } });
            }

            hasData = resp.length ? true : false;
        });


        if(hasData) {
            return res.status(400).send({ err: { message: 'Valores já existentes.' } });
        }

        const valores = await ValorEntity.create(req.body);

        return res.send({ valores }); // Enviando os valores da minha Entidade para a requisição.    

    } catch (e) {
        return res.status(400).send({ err: { message: 'Falha ao inserir Valores;', e }  });
    }
});

module.exports = (app) => app.use('/valores', router);