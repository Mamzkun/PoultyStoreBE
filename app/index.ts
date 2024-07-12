import express from 'express';
import { carInjection } from './injection';

const app = express()

app.use(express.json());
app.use('/api/cars', carInjection);

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})