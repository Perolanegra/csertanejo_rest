const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

require('./controllers/ProdutoCtrl')(app);
require('./controllers/PedidoCtrl')(app);

app.listen(3000, _ => console.log('listening to 3000'));