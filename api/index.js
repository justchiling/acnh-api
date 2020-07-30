'use strict';
import limit from 'express-rate-limit';
const app = require('express')();
const routes = require('./routes');

import log from './log';


const API_VERSION = 'v1'
const VALID_ENDPOINTS = [
    'art',
    'bugs',
    'fish',
    'fossils',
    'hourly',
    'houseware',
    'misc',
    'music',
    'sea-creatures',
    'villagers',
    'wall-mounted'
];

app.set('trust proxy', '127.0.0.1');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
});

app.use(
    limit({
        message: {status: 429, message: "API Rate Limit Reached."},
        windowMs: 5 * 60 * 1000, // equal to 300,000ms or 5 minutes
        max: 100 // no more than 100 requests in 5 minutes
    })
);

app.use('/', routes);

app.listen(3000, () => {
    log.info('API available at http://localhost:3000');
});