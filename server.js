const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let articulos = [];

// Obtener artículos
app.get("/api/articulos", (req, res) => {
    res.json(articulos);
});

// Crear artículo
app.post("/api/articulos", (req, res) => {
    const { titulo, autor, resumen } = req.body;

    if (!titulo || !autor || !resumen) {
        return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    const nuevoArticulo = {
        id: Date.now(),
        titulo,
        autor,
        resumen,
        estatus: "Registrado",
        fecha: new Date().toISOString()
    };

    articulos.push(nuevoArticulo);
    res.status(201).json(nuevoArticulo);
});

// Eliminar artículo
app.delete("/api/articulos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    articulos = articulos.filter(a => a.id !== id);
    res.json({ mensaje: "Artículo eliminado" });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});