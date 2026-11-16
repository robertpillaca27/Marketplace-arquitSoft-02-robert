/* es uan acción que se encarga de crear un producto en el sistema. 
Esta clase utiliza un repositorio de productos para almacenar 
la información del producto en la base de datos o en cualquier otro medio de almacenamiento que se esté utilizando. */

export default class CreateProduct {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    async execute(productData) {
        return await this.productRepository.create(productData);
    }
}
