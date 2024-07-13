import express from 'express';
import { carInjection, partnerInjection } from './injection';

const app = express()

app.use(express.json());
app.use('/api/cars', carInjection);
app.use('/api/partners', partnerInjection);

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})