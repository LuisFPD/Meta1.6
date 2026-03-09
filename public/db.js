const { openDB } = idb;

let db;

async function initDB() {
  db = await openDB("ArticulosDB", 1, {
    upgrade(db) {
  if (!db.objectStoreNames.contains("articulos")) {
    db.createObjectStore("articulos", { keyPath: "id" });
  }
  if (!db.objectStoreNames.contains("pendientes")) {
    db.createObjectStore("pendientes", { keyPath: "id", autoIncrement: true });
  }
}
  });
}

async function guardarArticuloLocal(articulo) {
  await db.put("articulos", articulo);
}

async function obtenerArticulosLocales() {
  return await db.getAll("articulos");
}

async function eliminarArticuloLocal(id) {
  await db.delete("articulos", id);
}

async function agregarPendiente(operacion) {
  await db.add("pendientes", operacion);
}

async function obtenerPendientes() {
  return await db.getAll("pendientes");
}

async function limpiarPendientes() {
  const tx = db.transaction("pendientes", "readwrite");
  await tx.store.clear();
  await tx.done;
}