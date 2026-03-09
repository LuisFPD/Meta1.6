const express = require("express");
const path = require("path");
const mysql = require("mysql2/promise");
const https = require("https");
const http = require("http");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

/* =========================
   MYSQL
========================= */

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Luicito2022",
  database: "articulos_db",
  port: 3307
});

/* =========================
   API
========================= */

// Obtener todos los artículos
app.get("/api/articulos", async (req, res) => {

  const [rows] = await pool.query("SELECT * FROM articulos");

  res.json(rows);

});

// Crear o actualizar artículo
app.post("/api/articulos", async (req, res) => {

  const { id, titulo, autor, resumen, fecha, version } = req.body;

  await pool.query(
    `INSERT INTO articulos 
    (id, titulo, autor, resumen, fecha, version)
    VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
    titulo=?, autor=?, resumen=?, fecha=?, version=?`,
    [
      id, titulo, autor, resumen, fecha, version,
      titulo, autor, resumen, fecha, version
    ]
  );

  res.json({ ok: true });

});

// Eliminar artículo
app.delete("/api/articulos/:id", async (req, res) => {

  await pool.query(
    "DELETE FROM articulos WHERE id=?",
    [req.params.id]
  );

  res.json({ ok: true });

});

/* =========================
   HTTPS SERVER
========================= */

const sslOptions = {

  key: fs.readFileSync(path.join(__dirname, "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert.pem"))

};

https.createServer(sslOptions, app).listen(3000, "0.0.0.0", () => {

  console.log("Servidor HTTPS activo");
  console.log("https://localhost:3000");
  console.log("https://10.21.51.55:3000");

});

/* =========================
   HTTP → HTTPS REDIRECT
========================= */

http.createServer((req, res) => {

  res.writeHead(301, {
    Location: "https://" + req.headers.host.replace(":3001", ":3000") + req.url
  });

  res.end();

}).listen(3001, () => {

  console.log("Redirección HTTP → HTTPS activa");

});