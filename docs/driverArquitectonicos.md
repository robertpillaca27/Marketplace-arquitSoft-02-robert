
# Drivers arquitectónicos de ayaPet

## 5.1 Drivers funcionales

| Código | Driver | Descripción |
|---|---|---|
| DF-01 | Gestión de productos | El administrador debe registrar nuevos productos. |
| DF-02 | Consulta de productos | El sistema debe mostrar los productos almacenados. |
| DF-03 | Actualización de productos | El administrador debe modificar la información de un producto. |
| DF-04 | Eliminación de productos | El administrador debe poder eliminar productos. |
| DF-05 | Persistencia de información | Los datos deben almacenarse en PostgreSQL. |

## 5.2 Drivers de calidad

| Código | Driver | Necesidad |
|---|---|---|
| DQ-01 | Rendimiento | Las operaciones de consulta y registro deben responder en tiempos adecuados. |
| DQ-02 | Mantenibilidad | El código debe estar organizado para facilitar su comprensión y modificación. |
| DQ-03 | Fiabilidad | Las operaciones deben procesarse correctamente y evitar registros inconsistentes. |
| DQ-04 | Seguridad | La API debe controlar los datos recibidos y evitar consultas SQL inseguras. |
| DQ-05 | Interoperabilidad | El frontend debe comunicarse con el backend mediante HTTP y JSON. |
| DQ-06 | Testabilidad | Las funcionalidades deben poder comprobarse mediante pruebas. |

## 5.3 Restricciones técnicas

| Código | Restricción | Decisión |
|---|---|---|
| RT-01 | Lenguaje backend | JavaScript con Node.js. |
| RT-02 | Framework backend | Express 5.3.0. |
| RT-03 | Base de datos | PostgreSQL. |
| RT-04 | Frontend | HTML5, CSS3 y JavaScript Vanilla. |
| RT-05 | Arquitectura interna | Clean Architecture. |
| RT-06 | Estilo de despliegue | Monolítico. |
| RT-07 | Documentación API | Swagger / OpenAPI. |
| RT-08 | Pruebas | Jest, Postman y k6. |

## 5.4 Relación con las decisiones arquitectónicas

Las necesidades de ayaPet orientaron la elección de una API REST, una base de datos relacional y una organización interna por capas.

Se eligió un backend monolítico porque el alcance del proyecto es pequeño y no necesita distribuir sus funcionalidades en diferentes servicios. Clean Architecture permite separar las responsabilidades del código y facilita su comprensión y mantenimiento.
