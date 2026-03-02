const express = require("express");
const path = require("path");
const mysql = require("mysql2/promise");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "TU_PASSWORD",
  database: "articulos_db"
});

app.post("/api/articulos", async (req, res) => {
  try {
    const { titulo, autor, resumen, fecha } = req.body;

    await pool.query(
      "INSERT INTO articulos (titulo, autor, resumen, fecha) VALUES (?, ?, ?, ?)",
      [titulo, autor, resumen, fecha]
    );

    res.json({ mensaje: "Guardado en MariaDB" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en BD" });
  }
});

app.delete("/api/articulos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM articulos WHERE id = ?",
      [id]
    );

    res.json({ mensaje: "Eliminado en BD" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error eliminando" });
  }
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor en http://localhost:3000");
});