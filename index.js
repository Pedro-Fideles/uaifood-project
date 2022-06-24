const express = require('express');
const bodyParser = require('body-parser');

const Restaurants = require('./controller/Restaurants');
const Items = require('./controller/Items');
const middlewaresRestaurants = require('./middlewares/Restaurants');
const middlewaresItems = require ('./middlewares/Items');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(bodyParser.json());

app.post('/register', ...Object.values(middlewaresRestaurants), Restaurants.createRestaurant);

app.post('/item', ...Object.values(middlewaresItems), Items.createItem);

app.put('/item', ...Object.values(middlewaresItems), Items.updateItem);

app.get('/restaurants', Restaurants.listWithFilters);

app.use(errorMiddleware);

app.listen(3001, () => console.log('ouvindo na porta 3001'));
