import './controllers/exampleController';

let port: number = process.env.PORT ? process.env.PORT : 3000;

import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as methodOverride from 'method-override';
import { RegisterRoutes } from './routes';

const app = express();

app.use('/docs', express.static(__dirname + '/swagger-ui'));
app.use('/swagger.json', (req, res) => {
    res.sendFile(__dirname + '/swagger.json');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

RegisterRoutes(app);

/* tslint:disable-next-line */
console.log(`Starting server on port ${port}...`);
var server = app.listen(port, function () {

});

const getServer = () => server;
const closeServer = (callb) => server.close(callb);

module.exports = {server: getServer, close: closeServer};
