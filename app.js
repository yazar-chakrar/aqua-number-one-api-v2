/*jshint esversion: 8 */
const express = require('express');
const app = express();

//used APis
require('./settings/joi')();

require('./app/db')();
require('./app/routes')(app);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`INFO: Listening on port ${port}...`));