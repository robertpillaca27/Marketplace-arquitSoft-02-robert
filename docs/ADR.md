
# Architecture Decision Records (ADR) - ayaPet

## ADR-001: Uso de una arquitectura monolítica

**Estado:** Aceptada

### Contexto
ayaPet es una aplicación web pequeña que permite administrar productos de una tienda de mascotas. Su alcance no requiere distribuir las funcionalidades en diferentes servicios.

### Decisión
Se decidió desarrollar el backend como una aplicación monolítica utilizando Node.js y Express 5.

### Alternativas consideradas
- Arquitectura monolítica.
- Arquitectura de microservicios.

### Justificación
La arquitectura monolítica permite desarrollar y ejecutar el backend como una única aplicación. Para el alcance actual de ayaPet, los microservicios agregarían complejidad innecesaria.

### Consecuencias
- Menor complejidad de desarrollo y despliegue.
- Las funcionalidades se gestionan desde una misma aplicación backend.
- Si el sistema crece considerablemente, se podrá evaluar una evolución arquitectónica.

---

## ADR-002: Organización interna mediante Clean Architecture

**Estado:** Aceptada

### Contexto
Se necesitaba organizar el backend para separar las responsabilidades y evitar que las reglas del negocio dependieran directamente de las solicitudes HTTP o de PostgreSQL.

### Decisión
Se decidió organizar el backend utilizando cuatro capas:

- Interfaces.
- Application.
- Domain.
- Infrastructure.

### Alternativas consideradas
- Arquitectura en capas tradicional.
- Organización sin separación explícita de responsabilidades.
- Clean Architecture.

### Justificación
Clean Architecture permite identificar dónde se encuentran las reglas del negocio, los casos de uso, las interfaces HTTP y las operaciones de persistencia.

### Consecuencias
- Código organizado por responsabilidades.
- Mayor facilidad para comprender y mantener el sistema.
- Necesidad de mantener una estructura ordenada al agregar nuevas funcionalidades.

---

## ADR-003: Uso de PostgreSQL como base de datos

**Estado:** Aceptada

### Contexto
ayaPet necesita almacenar productos y categorías, manteniendo una relación entre ambas entidades.

### Decisión
Se eligió PostgreSQL como sistema de gestión de base de datos relacional.

### Alternativas consideradas
- PostgreSQL.
- MySQL.
- MongoDB.

### Justificación
PostgreSQL permite trabajar con tablas, relaciones y restricciones de integridad. Estas características son suficientes para las necesidades de almacenamiento del proyecto.

### Consecuencias
- Los productos y categorías se almacenan en tablas relacionadas.
- Se utilizan claves primarias y foráneas.
- El backend accede a los datos mediante el paquete pg.

---

## ADR-004: Comunicación mediante API REST

**Estado:** Aceptada

### Contexto
El frontend y el backend necesitan comunicarse para consultar, registrar, actualizar y eliminar productos.

### Decisión
Se decidió utilizar una API REST con solicitudes HTTP y respuestas en formato JSON.

### Alternativas consideradas
- API REST.
- GraphQL.

### Justificación
REST permite implementar las operaciones CRUD mediante métodos HTTP conocidos: GET, POST, PUT y DELETE. Además, se integra directamente con Fetch API desde el frontend.

### Consecuencias
- El frontend y el backend se mantienen separados.
- Los recursos se exponen mediante endpoints.
- Se utiliza JSON para intercambiar información.
- La API puede probarse mediante Postman y documentarse con OpenAPI.

---

## ADR-005: Documentación de la API mediante Swagger / OpenAPI

**Estado:** Aceptada

### Contexto
Se necesitaba documentar los endpoints de la API para conocer qué operaciones ofrece el backend, qué datos reciben y qué respuestas devuelven.

### Decisión
Se decidió utilizar Swagger UI y swagger-jsdoc para documentar la API REST.

### Alternativas consideradas
- Documentación manual en Markdown.
- Swagger / OpenAPI.

### Justificación
Swagger permite visualizar y consultar los endpoints desde una interfaz web, facilitando la comprensión y las pruebas de la API.

### Consecuencias
- La documentación está disponible en /api-docs.
- Los endpoints y esquemas se pueden consultar desde el navegador.
- Los cambios en la API deben reflejarse también en su documentación.
