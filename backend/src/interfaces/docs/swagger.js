
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ayaPet API',
            version: '1.0.0',
            description: 'API REST para la gestión de productos de la tienda de mascotas ayaPet :)'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local de desarrollo'
            }
        ],

        // Esquemas reutilizables de la API
        components: {
            schemas: {

                // Datos que el cliente envía a la API
                ProductInput: {
                    type: 'object',
                    required: [
                        'name',
                        'price',
                        'stock',
                        'categoryId'
                    ],
                    properties: {
                        name: {
                            type: 'string',
                            example: 'Alimento para perros'
                        },
                        description: {
                            type: 'string',
                            example: 'Alimento balanceado para perros adultos'
                        },
                        price: {
                            type: 'number',
                            example: 85.90
                        },
                        stock: {
                            type: 'integer',
                            example: 20
                        },
                        imageUrl: {
                            type: 'string',
                            nullable: true,
                            example: null
                        },
                        categoryId: {
                            type: 'integer',
                            example: 1
                        }
                    }
                },

                // Datos que devuelve la API
                ProductResponse: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        name: {
                            type: 'string',
                            example: 'Alimento para perros'
                        },
                        description: {
                            type: 'string',
                            example: 'Alimento balanceado para perros adultos'
                        },
                        price: {
                            type: 'number',
                            example: 85.90
                        },
                        stock: {
                            type: 'integer',
                            example: 20
                        },
                        imageUrl: {
                            type: 'string',
                            nullable: true,
                            example: null
                        },
                        categoryId: {
                            type: 'integer',
                            example: 1
                        }
                    }
                }
            }
        }
    },

    apis: ['./src/interfaces/http/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
