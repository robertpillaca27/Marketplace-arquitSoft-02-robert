
import Product from './src/domain/entities/Product.js';

// Crear un producto válido
const product = new Product({
    name: 'Alimento para perros',
    description: 'Alimento para perros adultos',
    price: 85.90,
    stock: 20,
    categoryId: 1
});

console.log('Producto creado:', product);
