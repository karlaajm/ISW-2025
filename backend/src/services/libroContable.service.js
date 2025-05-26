"use strict";
import LibroContable from "../entity/libroContable.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createLibroContable(nombre) {
    try {
        const repo = AppDataSource.getRepository(LibroContable);
        const libro = repo.create({ nombre });
        const nuevoLibro = await repo.save(libro);
        return [nuevoLibro, null];
    } catch (error) {
        return [null, error.message];
    }
}

export async function getLibrosContables() {
  try {
    const repo = AppDataSource.getRepository(LibroContable);
    const libros = await repo.find();
    return [libros, null];
  } catch (error) {
    return [null, error.message];
  }
}

export async function getLibroContable(nombre) {
  try {
    const repo = AppDataSource.getRepository(LibroContable);
    const libro = await repo.findOneBy({ nombre });
    return [libro, null];
  } catch (error) {
    return [null, error.message];
  }
}

export async function updateLibroContable(nombre, nuevoNombre) {
  try {
    const repo = AppDataSource.getRepository(LibroContable);
    const libro = await repo.findOneBy({ nombre });
    if (!libro) return [null, "Libro no encontrado"];
    libro.nombre = nuevoNombre;
    const actualizado = await repo.save(libro);
    return [actualizado, null];
  } catch (error) {
    return [null, error.message];
  }
}

export async function deleteLibroContable(nombre) {
  try {
    const repo = AppDataSource.getRepository(LibroContable);
    const libro = await repo.findOneBy({ nombre });
    if (!libro) return [null, "Libro no encontrado"];
    await repo.remove(libro);
    return [true, null];
  } catch (error) {
    return [null, error.message];
  }
}