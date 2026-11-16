
// ==========================================
// 1. CONFIGURACIÓN DE LA API
// ==========================================

const API_URL = 'http://localhost:3000/api/products';


// ==========================================
// 2. SELECCIONAR ELEMENTOS DEL HTML
// ==========================================

const productList = document.getElementById('product-list');
const btnNewProduct = document.getElementById('btn-new-product');
const productForm = document.getElementById('product-form');


// ==========================================
// 3. OBTENER PRODUCTOS (GET)
// ==========================================

async function loadProducts() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error('No se pudieron obtener los productos');
        }

        const result = await response.json();

        console.log('Productos obtenidos:', result);

        const products = result.data;

        displayProducts(products);

    } catch (error) {

        console.error('Error:', error);

        productList.innerHTML = `
            <p>No fue posible cargar los productos.
            Verifica que el servidor esté funcionando.</p>
        `;
    }
}


// ==========================================
// 4. MOSTRAR PRODUCTOS EN EL CATÁLOGO
// ==========================================

function displayProducts(products) {

    productList.innerHTML = '';

    if (!Array.isArray(products) || products.length === 0) {
        productList.innerHTML = '<p>No hay productos registrados.</p>';
        return;
    }

    products.forEach(product => {

        const productCard = document.createElement('article');

        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <h3>${product.name}</h3>

            <p>${product.description ?? 'Sin descripción'}</p>

            <p><strong>Precio:</strong> S/ ${Number(product.price).toFixed(2)}</p>

            <p><strong>Stock:</strong> ${product.stock}</p>

            <div class="form-buttons">
                <button class="btn-edit" data-id="${product.id}">
                    Editar
                </button>
                <button class="btn-delete" data-id="${product.id}">
                    Eliminar
                </button>
            </div>
        `;

        productList.appendChild(productCard);

    });

    // Eventos de edición
    document.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', () => {
            editProduct(button.dataset.id);
        });
    });

    // Eventos de eliminación (los implementaremos después)
  document.querySelectorAll('.btn-delete').forEach(button => {
    button.addEventListener('click', () => {
        deleteProduct(button.dataset.id);
    });
});
}

// ==========================================
// 5. MOSTRAR FORMULARIO DE REGISTRO
// ==========================================

btnNewProduct.addEventListener('click', () => {

    productForm.innerHTML = `
        <div class="product-form-container">

            <h3>Registrar nuevo producto</h3>

            <form id="form-product">

                <label for="name">Nombre del producto</label>
                <input
                    type="text"
                    id="name"
                    required
                    placeholder="Ej. Alimento para perros"
                >

                <label for="description">Descripción</label>
                <textarea
                    id="description"
                    rows="3"
                    placeholder="Descripción del producto"
                ></textarea>

                <label for="price">Precio (S/)</label>
                <input
                    type="number"
                    id="price"
                    min="0.01"
                    step="0.01"
                    required
                >

                <label for="stock">Stock</label>
                <input
                    type="number"
                    id="stock"
                    min="0"
                    step="1"
                    required
                >

                <label for="categoryId">Categoría</label>
                <select id="categoryId" required>
                    <option value="">Seleccionar categoría</option>
                    <option value="1">Alimentos</option>
                    <option value="2">Accesorios</option>
                    <option value="3">Higiene</option>
                </select>

                <div class="form-buttons">

                    <button type="submit">
                        Guardar producto
                    </button>

                    <button
                        type="button"
                        class="btn-cancel"
                        id="btn-cancel"
                    >
                        Cancelar
                    </button>

                </div>

            </form>

        </div>
    `;

    // Botón cancelar
    document.getElementById('btn-cancel')
        .addEventListener('click', () => {
            productForm.innerHTML = '';
        });

    // Evento para registrar producto
    document.getElementById('form-product')
        .addEventListener('submit', createProduct);

});


// ==========================================
// 6. REGISTRAR PRODUCTO (POST)
// ==========================================

async function createProduct(event) {

    event.preventDefault();

    // Obtener datos del formulario
    const productData = {

        name: document.getElementById('name').value.trim(),

        description: document.getElementById('description').value.trim(),

        price: Number(document.getElementById('price').value),

        stock: Number(document.getElementById('stock').value),

        categoryId: Number(document.getElementById('categoryId').value)

    };

    try {

        // Enviar producto al backend
        const response = await fetch(API_URL, {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(productData)

        });

        // Leer respuesta del backend
        const result = await response.json();

        // Verificar si el registro fue exitoso
        if (!response.ok) {
            throw new Error(result.message || 'No se pudo registrar el producto');
        }

        alert('Producto registrado correctamente');

        console.log('Producto registrado:', result);

        // Cerrar formulario
        productForm.innerHTML = '';

        // Actualizar catálogo
        await loadProducts();

    } catch (error) {

        console.error('Error al registrar:', error);

        alert(error.message);

    }
}


// ==========================================
// 7. INICIAR APLICACIÓN
// ==========================================

loadProducts();

// ==========================================
// 8. OBTENER PRODUCTO PARA EDITAR (GET)
// ==========================================

async function editProduct(id) {

    try {

        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
            throw new Error('No se pudo obtener el producto');
        }

        const result = await response.json();

        const product = result.data;

        // Mostrar formulario con los datos actuales
        productForm.innerHTML = `
            <div class="product-form-container">

                <h3>Editar producto</h3>

                <form id="form-edit-product">

                    <label for="edit-name">Nombre del producto</label>
                    <input
                        type="text"
                        id="edit-name"
                        value="${product.name}"
                        required
                    >

                    <label for="edit-description">Descripción</label>
                    <textarea
                        id="edit-description"
                        rows="3"
                    >${product.description ?? ''}</textarea>

                    <label for="edit-price">Precio (S/)</label>
                    <input
                        type="number"
                        id="edit-price"
                        value="${product.price}"
                        min="0.01"
                        step="0.01"
                        required
                    >

                    <label for="edit-stock">Stock</label>
                    <input
                        type="number"
                        id="edit-stock"
                        value="${product.stock}"
                        min="0"
                        step="1"
                        required
                    >

                    <label for="edit-categoryId">Categoría</label>
                    <select id="edit-categoryId" required>
                        <option value="1" ${Number(product.categoryId) === 1 ? 'selected' : ''}>Alimentos</option>
                        <option value="2" ${Number(product.categoryId) === 2 ? 'selected' : ''}>Accesorios</option>
                        <option value="3" ${Number(product.categoryId) === 3 ? 'selected' : ''}>Higiene</option>
                    </select>

                    <div class="form-buttons">

                        <button type="submit">
                            Actualizar producto
                        </button>

                        <button
                            type="button"
                            class="btn-cancel"
                            id="btn-cancel-edit"
                        >
                            Cancelar
                        </button>

                    </div>

                </form>

            </div>
        `;

        // Evento para actualizar
        document.getElementById('form-edit-product')
            .addEventListener('submit', (event) => {
                updateProduct(event, id);
            });

        // Evento cancelar
        document.getElementById('btn-cancel-edit')
            .addEventListener('click', () => {
                productForm.innerHTML = '';
            });

        // Desplazarse hacia el formulario
        productForm.scrollIntoView({
            behavior: 'smooth'
        });

    } catch (error) {

        console.error('Error al obtener producto:', error);

        alert(error.message);

    }
}


// ==========================================
// 9. ACTUALIZAR PRODUCTO (PUT)
// ==========================================

async function updateProduct(event, id) {

    event.preventDefault();

    const productData = {

        name: document.getElementById('edit-name').value.trim(),

        description: document.getElementById('edit-description').value.trim(),

        price: Number(document.getElementById('edit-price').value),

        stock: Number(document.getElementById('edit-stock').value),

        categoryId: Number(document.getElementById('edit-categoryId').value)

    };

    try {

        const response = await fetch(`${API_URL}/${id}`, {

            method: 'PUT',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(productData)

        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'No se pudo actualizar el producto');
        }

        alert('Producto actualizado correctamente');

        console.log('Producto actualizado:', result);

        // Cerrar formulario
        productForm.innerHTML = '';

        // Recargar catálogo
        await loadProducts();

    } catch (error) {

        console.error('Error al actualizar:', error);

        alert(error.message);

    }
}


 // ==========================================
// 10. ELIMINAR PRODUCTO (DELETE)
// ==========================================

async function deleteProduct(id) {

    // Confirmar eliminación
    const confirmation = confirm(
        '¿Estás seguro de que deseas eliminar este producto?'
    );

    if (!confirmation) {
        return;
    }

    try {

        // Enviar solicitud DELETE
        const response = await fetch(`${API_URL}/${id}`, {

            method: 'DELETE'

        });

        const result = await response.json();

        // Verificar respuesta
        if (!response.ok) {
            throw new Error(
                result.message || 'No se pudo eliminar el producto'
            );
        }

        alert('Producto eliminado correctamente');

        console.log('Producto eliminado:', result);

        // Actualizar catálogo
        await loadProducts();

    } catch (error) {

        console.error('Error al eliminar:', error);

        alert(error.message);

    }
}

