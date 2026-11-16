
/*Entidad de dominio que representa un producto en el sistema.
Esta clase encapsula las propiedades y comportamientos de un producto, 
asegurando que los datos sean válidos y consistentes. 
Se utiliza en la capa de dominio para modelar la lógica de negocio relacionada con los productos. */
export default class Product {
    constructor({
        id = null,
        name,
        description = '',
        price,
        stock,
        imageUrl = null,
        categoryId
    }) {
        // Validar nombre
        if (typeof name !== 'string' || name.trim() === '') {
            throw new Error('El nombre del producto es obligatorio');
        }

        // Validar descripción
        if (typeof description !== 'string') {
            throw new Error('La descripción debe ser un texto');
        }

        // Validar precio
        if (
            price === undefined ||
            price === null ||
            !Number.isFinite(Number(price)) ||
            Number(price) <= 0
        ) {
            throw new Error('El precio debe ser mayor que cero');
        }

        // Validar stock
        if (
            stock === undefined ||
            stock === null ||
            !Number.isInteger(Number(stock)) ||
            Number(stock) < 0
        ) {
            throw new Error('El stock debe ser un entero mayor o igual a cero');
        }

        // Validar categoría
        if (!Number.isInteger(Number(categoryId)) || Number(categoryId) <= 0) {
            throw new Error('La categoría debe tener un identificador válido');
        }

        this.id = id;
        this.name = name.trim();
        this.description = description;
        this.price = Number(price);
        this.stock = Number(stock);
        this.imageUrl = imageUrl;
        this.categoryId = Number(categoryId);
    }
}