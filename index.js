const express = require('express');
const app = express();
const puerto = 3000;

// Permite que Express entienda datos en formato JSON
app.use(express.json());

// Arreglo en memoria (Base de datos simulada)
let mascotas = [
  { id: 1, nombre: "Firulais", especie: "Perro", edad: 3, adoptado: false }
];

// 1. LEER (READ) - Todas las mascotas
app.get('/mascotas', (req, res) => {
  res.json(mascotas);
});

// 2. LEER (READ) - Una mascota por ID
app.get('/mascotas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const mascota = mascotas.find(m => m.id === id);

  if (!mascota) {
    return res.status(404).json({ mensaje: "Mascota no encontrada" });
  }

  res.json(mascota);
});

// 3. CREAR (CREATE) - Añadir una nueva mascota
app.post('/mascotas', (req, res) => {
  const { nombre, especie, edad, adoptado } = req.body;

  const nuevaMascota = {
    id: mascotas.length > 0 ? mascotas[mascotas.length - 1].id + 1 : 1,
    nombre,
    especie,
    edad: edad || 0,
    adoptado: adoptado || false
  };

  mascotas.push(nuevaMascota);
  res.status(201).json(nuevaMascota);
});

// 4. ACTUALIZAR (UPDATE) - Modificar datos de una mascota por ID
app.put('/mascotas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = mascotas.findIndex(m => m.id === id);

  if (index === -1) {
    return res.status(404).json({ mensaje: "Mascota no encontrada" });
  }

  // Actualizar los datos
  mascotas[index] = {
    ...mascotas[index],
    ...req.body,
    id: id // Mantener el id original
  };

  res.json(mascotas[index]);
});

// 5. ELIMINAR (DELETE) - Borrar una mascota por ID
app.delete('/mascotas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = mascotas.findIndex(m => m.id === id);

  if (index === -1) {
    return res.status(404).json({ mensaje: "Mascota no encontrada" });
  }

  const mascotaEliminada = mascotas.splice(index, 1);
  res.json({ mensaje: "Mascota eliminada con éxito", mascota: mascotaEliminada[0] });
});

// Arrancar el servidor
app.listen(puerto, () => {
  console.log("¡Mi primer servidor está vivo en el puerto 3000!");
});