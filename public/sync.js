async function sincronizar() {

  if (!navigator.onLine) return;

  const pendientes = await obtenerPendientes();

  for (const op of pendientes) {

    if (op.tipo === "crear") {
      await fetch("/api/articulos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(op.data)
      });
    }

    if (op.tipo === "eliminar") {
      await fetch(`/api/articulos/${op.id}`, {
        method: "DELETE"
      });
    }
  }

  await limpiarPendientes();

  const res = await fetch("/api/articulos");
  const datosServidor = await res.json();

  for (const art of datosServidor) {
    await guardarArticuloLocal(art);
  }

  renderizar();
}

window.addEventListener("online", sincronizar);