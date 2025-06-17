import { Router } from 'express';
import { generateUser, generatePet } from '../mocking/mockGenerator.js';
import { UserModel } from '../models/user.model.js';

const router = Router();

router.get('/mockingusers', (req, res) => {
  const users = [];
  for (let i = 0; i < 50; i++) users.push(generateUser());
  res.json({ users });
});

router.post('/generateData', async (req, res) => {
  const { users = 0, pets = 0 } = req.body;

  const userMocks = Array.from({ length: users }, generateUser);
  const petMocks = Array.from({ length: pets }, generatePet);

  const insertedUsers = await UserModel.insertMany(userMocks);

  res.json({
    status: 'ok',
    inserted_users: insertedUsers.length,
    inserted_pets: petMocks.length
  });
});

router.get('/mockingpets', (req, res) => {
  const pets = Array.from({ length: 10 }, generatePet);
  res.json(pets);
});

export default router;
