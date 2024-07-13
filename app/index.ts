import express from 'express';
import { carRoutes, employeeRoutes, partnerRoutes, salaryRoutes, tripRoutes } from './injection';

const app = express()

app.use(express.json());
app.use('/api/cars', carRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/salaries', salaryRoutes);

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})