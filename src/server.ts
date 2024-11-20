import express from 'express';
import { router } from './routes';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

