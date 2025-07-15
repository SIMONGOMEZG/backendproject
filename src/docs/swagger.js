import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Ecommerce Electrodomésticos API',
      version: '1.0.0',
      description: 'Documentación del módulo Users'
    }
  },
  apis: ['./src/routes/users.routes.js']
};

const specs = swaggerJsdoc(swaggerOptions);

export { swaggerUi, specs };
