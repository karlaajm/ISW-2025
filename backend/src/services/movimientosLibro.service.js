import Movimiento from "../entity/movimientosLibro.entity.js";
import LibroContable from "../entity/libroContable.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createMovimientoService(data) {
  try {
    const movimientoRepository = AppDataSource.getRepository(Movimiento);
    const libroRepository = AppDataSource.getRepository(LibroContable);

    // Verifica que el libro exista
    const libro = await libroRepository.findOne({ where: { id: data.libroContable } });
    if (!libro) return [null, "Libro contable no encontrado"];

    // Crea el movimiento
    const nuevoMovimiento = movimientoRepository.create({
      monto: data.monto,
      descripcion: data.descripcion,
      tipo: data.tipo,
      libroContable: libro,
    });

    await movimientoRepository.save(nuevoMovimiento);

    // Actualiza los totales del libro
    await recalcularTotalesLibro(libro.id);

    return [nuevoMovimiento, null];
  } catch (error) {
    console.error("Error al crear movimiento:", error);
    return [null, "Error interno del servidor"];
  }
}

// Función para recalcular totales y balance
async function recalcularTotalesLibro(libroId) {
  const movimientoRepository = AppDataSource.getRepository(Movimiento);
  const libroRepository = AppDataSource.getRepository(LibroContable);

  const movimientos = await movimientoRepository.find({
    where: { libroContable: { id: libroId } },
  });

  const totalGanancias = movimientos
    .filter(m => m.tipo === "ganancia")
    .reduce((sum, m) => sum + m.monto, 0);

  const totalGastos = movimientos
    .filter(m => m.tipo === "gasto")
    .reduce((sum, m) => sum + m.monto, 0);

  const balanceGeneral = totalGanancias - totalGastos;

  await libroRepository.update(libroId, {
    totalGanancias,
    totalGastos,
    balanceGeneral,
  });
}

export async function updateMovimientoService(id, data) {
  try {
    const movimientoRepository = AppDataSource.getRepository(Movimiento);
    const movimiento = await movimientoRepository.findOne({ where: { id }, relations: ["libroContable"] });
    if (!movimiento) return [null, "Movimiento no encontrado"];

    movimiento.monto = data.monto ?? movimiento.monto;
    movimiento.descripcion = data.descripcion ?? movimiento.descripcion;
    movimiento.tipo = data.tipo ?? movimiento.tipo;

    await movimientoRepository.save(movimiento);

    // Recalcula totales del libro
    await recalcularTotalesLibro(movimiento.libroContable.id);

    return [movimiento, null];
  } catch (error) {
    console.error("Error al editar movimiento:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteMovimientoService(id) {
  try {
    const movimientoRepository = AppDataSource.getRepository(Movimiento);
    const movimiento = await movimientoRepository.findOne({ where: { id }, relations: ["libroContable"] });
    if (!movimiento) return [null, "Movimiento no encontrado"];

    const libroId = movimiento.libroContable.id;
    await movimientoRepository.remove(movimiento);

    // Recalcula totales del libro
    await recalcularTotalesLibro(libroId);

    return [true, null];
  } catch (error) {
    console.error("Error al eliminar movimiento:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getMovimientosLibroService(libroId) {
  try {
    const libroRepository = AppDataSource.getRepository(LibroContable);
    const libro = await libroRepository.findOne({ where: { id: libroId } });
    if (!libro) return [null, "Libro contable no encontrado"];

    const movimientoRepository = AppDataSource.getRepository(Movimiento);
    const movimientos = await movimientoRepository.find({
      where: { libroContable: { id: libroId } },
      order: { fechaCreacion: "DESC" }
    });
    return [movimientos, null];
  } catch (error) {
    console.error("Error al listar movimientos:", error);
    return [null, "Error interno del servidor"];
  }
}