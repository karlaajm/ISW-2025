"use strict";
import Estudiante from "../entity/estudiante.entity.js";
import { AppDataSource } from "./configDb.js";
import { encryptPassword } from "../helpers/bcrypt.helper.js";

async function createUsers() {
  try {
    const userRepository = AppDataSource.getRepository(Estudiante);

    const count = await userRepository.count();
    if (count > 0) return;

    await Promise.all([
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Diego Alexis Salazar Jara",
          rut: "21.308.770-3",
          email: "administrador2024@alumnos.ubiobio.cl",
          password: await encryptPassword("admin1234"),
          esCEE: true,
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Diego Sebastián Ampuero Belmar",
          rut: "21.151.897-9",
          email: "usuario1.2024@alumnos.ubiobio.cl",
          password: await encryptPassword("user1234"),
          esCEE: true,
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Alexander Benjamín Marcelo Carrasco Fuentes",
          rut: "20.630.735-8",
          email: "usuario2.2024@alumnos.ubiobio.cl",
          password: await encryptPassword("user1234"),
          esCEE: false,
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Pablo Andrés Castillo Fernández",
          rut: "20.738.450-K",
          email: "usuario3.2024@alumnos.ubiobio.cl",
          password: await encryptPassword("user1234"),
          esCEE: false,
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Felipe Andrés Henríquez Zapata",
          rut: "20.976.635-3",
          email: "usuario4.2024@alumnos.ubiobio.cl",
          password: await encryptPassword("user1234"),
          esCEE: false,
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Diego Alexis Meza Ortega",
          rut: "21.172.447-1",
          email: "usuario5.2024@alumnos.ubiobio.cl",
          password: await encryptPassword("user1234"),
          esCEE: false,
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Juan Pablo Rosas Martin",
          rut: "20.738.415-1",
          email: "usuario6.2024@alumnos.ubiobio.cl",
          password: await encryptPassword("user1234"),
          esCEE: false,
        }),
        userRepository.save(
          userRepository.create({
            nombreCompleto: "Karla Andrea Jimenez Millar",
            rut: "20.255.623-K",
            email: "karlitajmotaku@gmail.com",
            password: await encryptPassword("user1234"),
            esCEE: false,
          }),
        ),
      ),
    ]);
    console.log("* => Usuarios creados exitosamente");
  } catch (error) {
    console.error("Error al crear usuarios:", error);
  }
}

export { createUsers };
