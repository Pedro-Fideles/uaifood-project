const express = require('express');
const bodyParser = require('body-parser');

const Restaurants = require('./controller/Restaurants');
const middlewaresRestaurants = require('./middlewares/Restaurants');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(bodyParser.json());

app.post('/restaurants', ...Object.values(middlewaresRestaurants), Restaurants.createRestaurant);

app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo na porta 3000'));
