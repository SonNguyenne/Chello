import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import { webRoutes } from './routes/index'
const app = express();


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors({origin: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

webRoutes(app)

app.get('/', (req :any, res:any) => {
    res.send('Hello')
})

app.listen(3000, () => {
  console.log(`http://localhost:3000`)
})

