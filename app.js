const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const routes = require('./components/user/routes');

const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', routes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

module.exports = app;
