
import CreateProduct from './src/application/use-cases/CreateProduct.js';
import PostgreSQLProductRepository from './src/infraestructure/repositories/PostgreSQLProductRepository.js';
import pool from './src/infraestructure/database/connection.js';

// Crear el repositorio real
const productRepository = new PostgreSQLProductRepository();

// Crear el caso de uso
const createProduct = new CreateProduct(productRepository);

try {
    const product = await createProduct.execute({
        name: 'Pelota para perros',
        description: 'Pelota de goma para mascotas',
        price: 18.50,
        stock: 25,
        imageUrl: 'https://example.com/pelota.jpg',
        categoryId: 2
    });

    console.log('Producto registrado correctamente:');
    console.log(product);

} catch (error) {
    console.error('Error al registrar producto:', error.message);

} finally {
    await pool.end();
}
