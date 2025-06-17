import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import exphbs from 'express-handlebars';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import passport from 'passport';

import './src/auth/passport-jwt.config.js';
import './src/config/dao.config.js';

import productRoutes from './src/routes/products.routes.js';
import cartRoutes from './src/routes/carts.routes.js';
import viewsRoutes from './src/routes/views.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import sessionRoutes from './src/routes/sessions.routes.js';
import mocksRouter from './src/routes/mocks.router.js';
import errorHandler from './src/middleware/errorHandler.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/api/mocks', mocksRouter);
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(passport.initialize());

app.engine('handlebars', exphbs.engine({
  helpers: {
    multiply: (a, b) => a * b,
    ifEquals: (a, b, options) => (a === b ? options.fn(this) : options.inverse(this))
  }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src/views'));

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/auth', authRoutes);
app.use('/', viewsRoutes);

app.use(errorHandler);

const httpServer = http.createServer(app);
const io = new SocketServer(httpServer);

io.on('connection', socket => {
  console.log('🟢 Cliente conectado:', socket.id);
  socket.on('addProduct', data => {
    io.emit('productAdded', data);
  });
  socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado:', socket.id);
  });
});

mongoose.connect(process.env.MONGO_URI, { dbName: 'ecommerce' })
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`🚀 Servidor listo en http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('❌ Error Mongo:', err));
