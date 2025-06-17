import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

export function generateUser() {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 80 }),
    password: bcrypt.hashSync('coder123', 10),
    role: faker.helpers.arrayElement(['user', 'admin']),
    pets: []
  };
}

export function generatePet() {
  return {
    name: faker.animal.dog(),
    species: faker.animal.type(),
    age: faker.number.int({ min: 1, max: 15 })
  };
}
