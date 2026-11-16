
import pool from '../database/connection.js';
import Product from '../../domain/entities/Product.js';

export default class PostgreSQLProductRepository {

    async create(productData) {

        // 1. Crear y validar la entidad
        const product = new Product(productData);

        // 2. Ejecutar la consulta SQL
        const query = `
            INSERT INTO products
            (name, description, price, stock, image_url, category_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;

        // 3. Enviar los valores a PostgreSQL
        const values = [
            product.name,
            product.description,
            product.price,
            product.stock,
            product.imageUrl,
            product.categoryId
        ];

        const result = await pool.query(query, values);

        // 4. Devolver el producto registrado
        const row = result.rows[0];

        return {
            id: row.id,
            name: row.name,
            description: row.description,
            price: Number(row.price),
            stock: row.stock,
            imageUrl: row.image_url,
            categoryId: row.category_id
        };
    }

async findAll() {
    const query = `
        SELECT
            id,
            name,
            description,
            price,
            stock,
            image_url,
            category_id
        FROM products
        ORDER BY id ASC
    `;

    const result = await pool.query(query);

    return result.rows.map(row => ({
        id: row.id,
        name: row.name,
        description: row.description,
        price: Number(row.price),
        stock: row.stock,
        imageUrl: row.image_url,
        categoryId: row.category_id
    }));
}


async findById(id) {
    const query = `
        SELECT
            id,
            name,
            description,
            price,
            stock,
            image_url,
            category_id
        FROM products
        WHERE id = $1
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
        return null;
    }

    const row = result.rows[0];

    return {
        id: row.id,
        name: row.name,
        description: row.description,
        price: Number(row.price),
        stock: row.stock,
        imageUrl: row.image_url,
        categoryId: row.category_id
    };
}



async update(id, productData) {
    // 1. Validar los datos mediante la entidad Product
    const product = new Product({
        ...productData,
        id
    });

    // 2. Actualizar el producto en PostgreSQL
    const query = `
        UPDATE products
        SET
            name = $1,
            description = $2,
            price = $3,
            stock = $4,
            image_url = $5,
            category_id = $6
        WHERE id = $7
        RETURNING *
    `;

    const values = [
        product.name,
        product.description,
        product.price,
        product.stock,
        product.imageUrl,
        product.categoryId,
        id
    ];

    const result = await pool.query(query, values);

    // 3. Verificar si existe el producto
    if (result.rows.length === 0) {
        return null;
    }

    // 4. Devolver el producto actualizado
    const row = result.rows[0];

    return {
        id: row.id,
        name: row.name,
        description: row.description,
        price: Number(row.price),
        stock: row.stock,
        imageUrl: row.image_url,
        categoryId: row.category_id
    };
}


async delete(id) {
    const query = `
        DELETE FROM products
        WHERE id = $1
        RETURNING id
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
        return false;
    }

    return true;
}

}
