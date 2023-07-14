import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import RestRouter from './routers/routerApi.js'
import HealthRouter from './routers/routerHealth.js'
import {fileURLToPath} from 'url'
import * as path from "path";

const app = express()

app.use(express.json());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(cors())

console.log('Register health check routerApi');
app.use(HealthRouter);

const apiRoutes = [RestRouter];
app.use('/api', apiRoutes)

const staticDir = process.env.BE_STATIC || 'static';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
app.use('/', express.static(path.join(__dirname, staticDir)));

// Listen on port
const port = parseInt(process.env.BE_PORT || '8080', 10);
app.listen(port).address();
console.log(`On baseUrl http://localhost:${port}`);
console.log()
console.log('Managing accounts!')
console.log('-------------------------------------')
console.log()
