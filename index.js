const express = require('express');
const app = express();
const puerto = 3000;

app.use(express.json());

let mascotas = [
  { id: 1, nombre: "Firulais", especie: "Perro", edad: 3, adoptado: false }
];

app.get('/mascotas', (req, res) => {
  res.json(mascotas);
});

app.get('/mascotas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const mascota = mascotas.find(m => m.id === id);

  if (!mascota) {
    return res.status(404).json({ mensaje: "Mascota no encontrada" });
  }

  res.json(mascota);
});

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

app.put('/mascotas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = mascotas.findIndex(m => m.id === id);

  if (index === -1) {
    return res.status(404).json({ mensaje: "Mascota no encontrada" });
  }

  mascotas[index] = {
    ...mascotas[index],
    ...req.body,
    id: id 
  };

  res.json(mascotas[index]);
});

app.delete('/mascotas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = mascotas.findIndex(m => m.id === id);

  if (index === -1) {
    return res.status(404).json({ mensaje: "Mascota no encontrada" });
  }

  const mascotaEliminada = mascotas.splice(index, 1);
  res.json({ mensaje: "Mascota eliminada con éxito", mascota: mascotaEliminada[0] });
});


app.listen(puerto, () => {
  console.log("¡Mi primer servidor está vivo en el puerto 3000!");
});