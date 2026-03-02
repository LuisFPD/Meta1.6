const express = require("express");
const path = require("path");
const mysql = require("mysql2/promise");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Luicito2022",
  database: "articulos_db"
});

app.get("/api/articulos", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM articulos");
  res.json(rows);
});

app.post("/api/articulos", async (req, res) => {
  const { id, titulo, autor, resumen, fecha, version } = req.body;

  await pool.query(
    "INSERT INTO articulos (id, titulo, autor, resumen, fecha, version) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE titulo=?, autor=?, resumen=?, fecha=?, version=?",
    [id, titulo, autor, resumen, fecha, version,
     titulo, autor, resumen, fecha, version]
  );

  res.json({ ok: true });
});

app.delete("/api/articulos/:id", async (req, res) => {
  await pool.query("DELETE FROM articulos WHERE id = ?", [req.params.id]);
  res.json({ ok: true });
});

app.listen(3000, "0.0.0.0", () =>
  console.log("Servidor en http://localhost:3000")
);