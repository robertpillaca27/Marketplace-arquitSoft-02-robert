
-- Tabla de categorías
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Tabla de productos
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    image_url TEXT,
    category_id INTEGER NOT NULL,
    CONSTRAINT fk_product_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
);
