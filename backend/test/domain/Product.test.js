
import Product from '../../src/domain/entities/Product.js';

describe('Entidad Product', () => {

    test('Debe crear un producto con datos válidos', () => {
        const product = new Product({
            name: 'Alimento para perros',
            description: 'Alimento balanceado',
            price: 85.90,
            stock: 20,
            imageUrl: null,
            categoryId: 1
        });

        expect(product.name).toBe('Alimento para perros');
        expect(product.price).toBe(85.90);
        expect(product.stock).toBe(20);
        expect(product.categoryId).toBe(1);
    });

    test('Debe rechazar un producto sin nombre', () => {
        expect(() => {
            new Product({
                name: '',
                price: 25,
                stock: 10,
                categoryId: 1
            });
        }).toThrow('El nombre del producto es obligatorio');
    });

    test('Debe rechazar un precio negativo', () => {
        expect(() => {
            new Product({
                name: 'Collar para perros',
                price: -10,
                stock: 10,
                categoryId: 1
            });
        }).toThrow('El precio debe ser mayor que cero');
    });

    test('Debe rechazar un stock negativo', () => {
        expect(() => {
            new Product({
                name: 'Pelota para perros',
                price: 20,
                stock: -5,
                categoryId: 1
            });
        }).toThrow('El stock debe ser un entero mayor o igual a cero');
    });

    test('Debe aceptar un producto con stock igual a cero', () => {
        const product = new Product({
            name: 'Juguete para gatos',
            price: 25,
            stock: 0,
            categoryId: 1
        });

        expect(product.stock).toBe(0);
    });

    test('Debe rechazar una categoría inválida', () => {
        expect(() => {
            new Product({
                name: 'Collar para perros',
                price: 30,
                stock: 10,
                categoryId: 0
            });
        }).toThrow('La categoría debe tener un identificador válido');
    });

    test('Debe rechazar una descripción que no sea texto', () => {
        expect(() => {
            new Product({
                name: 'Alimento para gatos',
                description: 123,
                price: 45,
                stock: 10,
                categoryId: 1
            });
        }).toThrow('La descripción debe ser un texto');
    });

});
