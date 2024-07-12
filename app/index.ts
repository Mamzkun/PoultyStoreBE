import express from 'express';
import { PrismaClient } from '@prisma/client';
import routes from './routes'

const app = express()
const prisma = new PrismaClient();

app.use(express.json());
app.use('/api', routes(prisma))

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})