
# Diagrama de despliegue

El sistema ayaPet se ejecuta actualmente en un entorno local de desarrollo.

El administrador accede al frontend desde un navegador web. El frontend realiza solicitudes HTTP al backend, que procesa las operaciones y consulta la base de datos PostgreSQL.

```mermaid
flowchart TB
    Admin["Administrador de la tienda"]

    subgraph Equipo["Equipo de desarrollo "]
        Browser["Navegador web"]
        Frontend["Frontend ayaPet<br/>HTML, CSS y JavaScript<br/>Live Server :5500"]

        subgraph Backend["Backend monolítico - Node.js"]
            API["Express 5<br/>API REST :3000"]
            App["Clean Architecture<br/>Interfaces, Application,<br/>Domain e Infrastructure"]
        end

        DB[("PostgreSQL<br/>ayapet_db :5432")]
    end

    Admin --> Browser
    Browser --> Frontend
    Frontend -->|"HTTP / JSON"| API
    API --> App
    App -->|"Consultas SQL mediante pg"| DB
```

## Componentes del despliegue

- **Navegador web:** permite al administrador visualizar el catálogo y gestionar los productos.
- **Frontend:** se ejecuta mediante Live Server y presenta la interfaz de ayaPet.
- **Backend:** aplicación monolítica desarrollada con Node.js y Express 5. Expone los endpoints REST.
- **Base de datos:** PostgreSQL almacena las categorías y los productos.

Este despliegue corresponde al entorno local utilizado para desarrollar y probar el sistema. No representa todavía un despliegue productivo.
