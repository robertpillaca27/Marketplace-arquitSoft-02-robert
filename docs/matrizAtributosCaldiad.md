
# Evaluación de atributos de calidad de ayaPet

| Atributo | Qué evaluaremos | Métrica | Herramienta |
|---|---|---|---|
| Rendimiento | Tiempo de respuesta de la API | Promedio y percentil 95 (p95) | k6 |
| Capacidad | Comportamiento con varias solicitudes simultáneas | Solicitudes por segundo y usuarios virtuales | k6 |
| Fiabilidad | Respuestas correctas de los endpoints | Porcentaje de solicitudes exitosas y errores HTTP | Postman / k6 |
| Funcionalidad | Funcionamiento del CRUD | Casos de prueba aprobados y fallidos | Postman |
| Validación de datos | Rechazo de datos incorrectos | Porcentaje de casos de validación aprobados | Postman |
| Mantenibilidad | Organización y cobertura de pruebas de la entidad | Cobertura de statements, branches, functions y lines | Jest |
| Seguridad básica | Rechazo de entradas inválidas y manejo de errores | Casos de validación y respuestas HTTP esperadas | Postman |

## 6.2 Criterios iniciales de aceptación

Para realizar la evaluación, se proponen los siguientes objetivos de referencia. No son resultados obtenidos; son valores que utilizaremos para determinar si las pruebas cumplen lo esperado.

| Métrica | Objetivo propuesto |
|---|---|
| Tiempo de respuesta p95 | Menor a 500 ms |
| Solicitudes exitosas en prueba de carga | Igual o mayor al 95 % |
| Errores inesperados HTTP 5xx | 0 durante la prueba |
| Operaciones CRUD | 100 % de casos funcionales aprobados |
| Validaciones de datos | 100 % de casos definidos aprobados |
| Cobertura de Product.js | Igual o mayor al 80 % |

## 6.3 Herramientas de evaluación

### Postman: pruebas funcionales de la API

Postman permite verificar que los endpoints funcionen correctamente.

Se evaluarán:

- GET /api/products: listar productos.
- GET /api/products/:id: consultar un producto.
- POST /api/products: registrar un producto.
- PUT /api/products/:id: actualizar un producto.
- DELETE /api/products/:id: eliminar un producto.

También se probarán datos inválidos, productos inexistentes y respuestas HTTP.

### k6: pruebas de rendimiento y carga

k6 permite simular usuarios virtuales que realizan solicitudes a la API.

Se evaluará:

- Cuánto tarda la API en responder.
- Cómo se comporta cuando recibe varias solicitudes.
- Cuántas solicitudes puede procesar.
- Qué porcentaje de solicitudes falla.

### Jest: pruebas unitarias

Jest permite comprobar las reglas de la entidad Product. Se utilizará su reporte de cobertura para revisar qué parte del código está siendo evaluada por las pruebas automatizadas.

## 6.4 Evidencias de evaluación

Los resultados se documentarán con:

1. Capturas de las pruebas funcionales realizadas en Postman.
2. Reporte de ejecución de k6.
3. Reporte de cobertura generado por Jest.
4. Tabla de resultados que compare los objetivos con los valores obtenidos.

La evaluación permitirá identificar si el sistema cumple los criterios definidos y qué aspectos necesitan mejoras.
