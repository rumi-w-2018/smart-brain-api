const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const users = require('./components/user/routes');
const image = require('./components/image/routes');

const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/user', users);
app.use('/image', image);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running on port 5000');
});

module.exports = app;
