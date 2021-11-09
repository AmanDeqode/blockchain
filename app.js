import express from 'express';
import dotenv from 'dotenv';

import routes from './routes/index';
dotenv.config();
const {PORT,HOST} = process.env;

const app = express();

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is connected at http://${HOST}:${PORT}`);
});
