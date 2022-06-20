const express = require('express');
const bodyParser = require('body-parser');

const Restaurants = require('./controller/Restaurants');

const app = express();

app.use(bodyParser.json());

app.post('/restaurants', Restaurants.createRestaurant);

app.listen(3000, () => console.log('ouvindo na porta 3000'));
