import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json';

dotenv.config({ path: '../.env' }); 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors())
app.use(bodyParser.json());
app.use('/api', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
