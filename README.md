# Meta 1.6 – Implementación con IA guiada del primer incremento

## Descripción del Proyecto

Desarrollo del primer incremento de una PWA para gestión de revisión académica.  
Este incremento implementa la funcionalidad base de registro de artículos académicos utilizando almacenamiento local del navegador.

---

## Historia Técnica Implementada

Historia Técnica #1 – Registro de Artículos

Como usuario del sistema,  
quiero registrar artículos académicos  
para almacenarlos y gestionarlos dentro del sistema de revisión.

### Criterios de aceptación

- Formulario con campos: título, autor y resumen.
- Validación de campos obligatorios.
- Generación de objeto `Articulo` con:
  - id único
  - estatus "Registrado"
  - fecha en formato ISO
- Persistencia en LocalStorage bajo la clave "artículos".
- Visualización dinámica de artículos registrados.
- Eliminación individual de artículos.
- Ejecución sin errores en consola.

---

## Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- LocalStorage API

No se utilizaron frameworks, backend ni librerías externas.

---

## Instrucciones de Ejecución

1. Clonar o descargar el repositorio.
2. Abrir el archivo `index.html` en un navegador moderno.
3. Registrar artículos y validar su almacenamiento y eliminación.

---

## Pruebas Realizadas

Se ejecutaron los siguientes casos de prueba:

1. Registro exitoso con datos válidos.
2. Validación de campos vacíos.
3. Eliminación de artículo registrado.
4. Persistencia de datos tras recarga del navegador.

Todos los casos cumplen los criterios de aceptación y no generan errores en consola.

---

## Uso de Inteligencia Artificial

La implementación fue guiada mediante prompts estructurados en ChatGPT.

Se utilizaron:
- Un prompt para generación del código base.
- Un prompt para definición de casos de prueba.

Cada resultado fue analizado críticamente antes de su integración.

---

## Control de Versiones

Commit principal:

feat: implementación historia técnica #1 - registro de artículos

Incluye:
- Formulario HTML
- Persistencia en LocalStorage
- Renderizado dinámico
- Eliminación de artículos
- Documentación de pruebas

---

## Estado del Proyecto

- Funcionalidad base implementada
- Persistencia operativa
- Sin errores en consola
- Cumple los criterios de aceptación definidos para el incremento
