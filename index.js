const express = require('express');
const bodyParser = require('body-parser');

const Restaurants = require('./controller/Restaurants');
const Items = require('./controller/Items');
const middlewaresRestaurants = require('./middlewares/Restaurants');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(bodyParser.json());

app.post('/register', ...Object.values(middlewaresRestaurants), Restaurants.createRestaurant);

app.post('/item', Items.createItem);

app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo na porta 3000'));
