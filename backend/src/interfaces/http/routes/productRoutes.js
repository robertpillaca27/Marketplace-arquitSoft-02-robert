
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Devuelve la lista de productos registrados en ayaPet.
 *     tags:
 *       - Productos
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Productos obtenidos correctamente
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProductResponse'
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     description: Busca un producto específico utilizando su identificador.
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador del producto
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Producto encontrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Producto obtenido correctamente
 *                 data:
 *                   $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Registrar un nuevo producto
 *     description: Registra un producto en el catálogo de ayaPet.
 *     tags:
 *       - Productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Producto registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Producto registrado correctamente
 *                 data:
 *                   $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     description: Actualiza los datos de un producto existente.
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador del producto
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Producto actualizado correctamente
 *                 data:
 *                   $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     description: Elimina un producto del catálogo de ayaPet.
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador del producto que se eliminará
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */

export default function productRoutes(productController) {

    router.post('/', (req, res) =>
        productController.create(req, res)
    );

    router.get('/', (req, res) =>
        productController.findAll(req, res)
    );

    router.get('/:id', (req, res) =>
        productController.findById(req, res)
    );

    router.put('/:id', (req, res) =>
        productController.update(req, res)
    );

    router.delete('/:id', (req, res) =>
        productController.delete(req, res)
    );

    return router;
}
