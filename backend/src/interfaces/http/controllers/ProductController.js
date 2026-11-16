
export default class ProductController {
    constructor(
        createProduct,
        getAllProducts,
        getProductById,
        updateProduct,
        deleteProduct
    ) {
        this.createProduct = createProduct;
        this.getAllProducts = getAllProducts;
        this.getProductById = getProductById;
        this.updateProduct = updateProduct;
        this.deleteProduct = deleteProduct;
    }

    // Identificar errores de validación del dominio
    handleValidationError(error, res) {
        const validationMessages = [
            'El nombre del producto es obligatorio',
            'La descripción debe ser un texto',
            'El precio debe ser mayor que cero',
            'El stock debe ser un entero mayor o igual a cero',
            'La categoría debe tener un identificador válido'
        ];

        if (validationMessages.includes(error.message)) {
            return res.status(400).json({
                message: error.message
            });
        }

        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }

    async create(req, res) {
        try {
            const product = await this.createProduct.execute(req.body);

            return res.status(201).json({
                message: 'Producto registrado correctamente',
                data: product
            });
        } catch (error) {
            return this.handleValidationError(error, res);
        }
    }

    async findAll(req, res) {
        try {
            const products = await this.getAllProducts.execute();

            return res.status(200).json({
                message: 'Productos obtenidos correctamente',
                data: products
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error al consultar los productos'
            });
        }
    }

    async findById(req, res) {
        try {
            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    message: 'El ID debe ser un número entero positivo'
                });
            }

            const product = await this.getProductById.execute(id);

            if (!product) {
                return res.status(404).json({
                    message: 'Producto no encontrado'
                });
            }

            return res.status(200).json({
                message: 'Producto obtenido correctamente',
                data: product
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error al consultar el producto'
            });
        }
    }

    async update(req, res) {
        try {
            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    message: 'El ID debe ser un número entero positivo'
                });
            }

            const product = await this.updateProduct.execute(id, req.body);

            if (!product) {
                return res.status(404).json({
                    message: 'Producto no encontrado'
                });
            }

            return res.status(200).json({
                message: 'Producto actualizado correctamente',
                data: product
            });
        } catch (error) {
            return this.handleValidationError(error, res);
        }
    }

    async delete(req, res) {
        try {
            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    message: 'El ID debe ser un número entero positivo'
                });
            }

            const deleted = await this.deleteProduct.execute(id);

            if (!deleted) {
                return res.status(404).json({
                    message: 'Producto no encontrado'
                });
            }

            return res.status(200).json({
                message: 'Producto eliminado correctamente'
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error al eliminar el producto'
            });
        }
    }
}
