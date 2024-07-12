import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const routes = (prisma: PrismaClient) => {
  const router = Router();

  router.get('/users', async (req, res) => {
    const users = await prisma.car.findMany();
    res.json(users);
  });

  router.post('/users', async (req, res) => {
    const { plat, merk } = req.body;
    const user = await prisma.car.create({
      data: { plat, merk }
    });
    res.json(user);
  });

  return router;
};

export default routes;
