
import cors from 'cors';
import express from 'express';


//swagger apirest
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/interfaces/docs/swagger.js';

// Infrastructure
import PostgreSQLProductRepository from './src/infraestructure/repositories/PostgreSQLProductRepository.js';

// Application
import CreateProduct from './src/application/use-cases/CreateProduct.js';
import GetAllProducts from './src/application/use-cases/GetAllProducts.js';
import GetProductById from './src/application/use-cases/GetProductById.js';
import UpdateProduct from './src/application/use-cases/UpdateProduct.js';
import DeleteProduct from './src/application/use-cases/DeleteProduct.js';

// Interfaces
import ProductController from './src/interfaces/http/controllers/ProductController.js';
import productRoutes from './src/interfaces/http/routes/productRoutes.js';

const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));
// Middleware
app.use(express.json());

//apirest
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Inyección de dependencias
const productRepository = new PostgreSQLProductRepository();

const createProduct = new CreateProduct(productRepository);

const getAllProducts = new GetAllProducts(productRepository);

const getProductById = new GetProductById(productRepository);
const updateProduct = new UpdateProduct(productRepository);
const deleteProduct = new DeleteProduct(productRepository);

const productController = new ProductController(
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
);

// Rutas
app.use('/api/products', productRoutes(productController));

// Ruta inicial
app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenido a ayaPet API',
        status: 'Servidor funcionando correctamente'
    });
});

export default app;

