import express from 'express';
import { activityRoutes, carRoutes, employeeRoutes, partnerRoutes, salaryRoutes, tripRoutes, wageRoutes } from './injection';

const app = express()

app.use(express.json());
app.use('/api/cars', carRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/salaries', salaryRoutes);
app.use('/api/wages', wageRoutes);
app.use('/api/activity', activityRoutes);

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})