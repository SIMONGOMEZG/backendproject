import { Router } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model.js';
import { generateToken } from '../utils/jwt.utils.js';

const router = Router();

router.post('/register', async (req, res) => {
  const { first_name, last_name, email, password, age } = req.body;
  const exists = await UserModel.findOne({ email });
  if (exists) return res.status(400).json({ error: 'Email ya registrado' });

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = await UserModel.create({
    first_name, last_name, email, age, password: hashedPassword
  });

  res.status(201).json({ message: 'Usuario registrado', user: newUser });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const token = generateToken(user);
  res.cookie('jwt', token, { httpOnly: true, secure: false }).json({ message: 'Login exitoso' });
});

router.get('/logout', (req, res) => {
  res.clearCookie('jwt').json({ message: 'Sesión cerrada' });
});

export default router;
