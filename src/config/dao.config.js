import dotenv from 'dotenv';
dotenv.config();

let ProductDAO, CartDAO, UserDAO;

if (process.env.DAO === 'mongo') {
  const { ProductManagerMongo } = await import('../dao/mongo/ProductManagerMongo.js');
  const { CartManagerMongo } = await import('../dao/mongo/CartManagerMongo.js');
  const { UserManagerMongo } = await import('../dao/mongo/UserManagerMongo.js');

  ProductDAO = new ProductManagerMongo();
  CartDAO = new CartManagerMongo();
  UserDAO = new UserManagerMongo();
}

export { ProductDAO, CartDAO, UserDAO };
