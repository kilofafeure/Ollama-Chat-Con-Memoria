# Chat con Ollama

Un proyecto simple para probar [Ollama](https://ollama.com/) en local, construido con HTML, CSS y JavaScript vanilla.

## Estructura del proyecto

```
index.html    - Estructura principal
main.css      - Estilos
script.js     - Lógica de interacción con Ollama
```

## Requisitos previos

- [Ollama](https://ollama.com/) instalado y corriendo en tu máquina
- Los modelos gemma4:e2b y qwen2.5-coder:14b descargados
- Ollama debe estar ejecutándose en `http://localhost:11434`

## Cómo ejecutar

1. Abre `index.html` en tu navegador. Puedes hacerlo directamente haciendo doble clic o usando Live Server en VS Code.

2. Escribe tu mensaje en el textarea y pulsa **Enviar**.

## Cómo funciona

- El usuario escribe un prompt en el campo de texto.
- Al pulsar Enviar, se realiza una petición POST al endpoint `/api/generate` de Ollama.
- El botón se deshabilita y se muestra un estado de "Pensando...".
- La respuesta se muestra en el área de resultados.
- Si hay un error de conexión, se muestra un mensaje de error.

## API invocada

- **Endpoint:** `http://localhost:11434/api/generate`
- **Método:** POST
- **Modelo:** gemma4:e2b
- **Streaming:** false
- **Content-Type:** application/json

## Notas

- Proyecto de prueba básica. No incluye historial de conversación ni modo streaming.

## Licencia

Proyecto personal sin licencia.
