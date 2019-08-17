const mongoose = require('mongoose');

const url = 'mongodb://localhost/nodeRest';
const opts = { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false };

mongoose.connect(url, opts);
mongoose.Promise = global.Promise;

module.exports = mongoose;