
# Diagrama de componentes del backend

El backend de ayaPet está organizado mediante Clean Architecture. Cada capa tiene una responsabilidad y participa en el procesamiento de las operaciones relacionadas con productos.

```mermaid
flowchart TB
    subgraph Interfaces["Interfaces"]
        Routes["productRoutes.js"]
        Controller["ProductController.js"]
    end

    subgraph Application["Application"]
        Create["CreateProduct"]
        FindAll["GetAllProducts"]
        FindById["GetProductById"]
        Update["UpdateProduct"]
        Delete["DeleteProduct"]
    end

    subgraph Domain["Domain"]
        Product["Product.js<br/>Entidad y validaciones"]
    end

    subgraph Infrastructure["Infrastructure"]
        Repository["PostgreSQLProductRepository.js"]
        Connection["connection.js<br/>Pool de PostgreSQL"]
        DB[("PostgreSQL")]
    end

    Routes --> Controller
    Controller --> Create
    Controller --> FindAll
    Controller --> FindById
    Controller --> Update
    Controller --> Delete

    Create --> Repository
    FindAll --> Repository
    FindById --> Repository
    Update --> Repository
    Delete --> Repository

    Repository --> Product
    Repository --> Connection
    Connection --> DB
```

## Responsabilidad de los componentes

- **Interfaces:** recibe las solicitudes HTTP y entrega las respuestas.
- **Application:** ejecuta los casos de uso del sistema.
- **Domain:** contiene la entidad Product y sus reglas de validación.
- **Infrastructure:** realiza las operaciones de persistencia en PostgreSQL.
```
