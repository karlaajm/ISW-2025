"use strict";
import Estudiante from "../entity/estudiante.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { comparePassword, encryptPassword } from "../helpers/bcrypt.helper.js";

export async function getUserService(query) {
  try {
    const { rut } = query;

    const userRepository = AppDataSource.getRepository(Estudiante);

    const userFound = await userRepository.findOne({
      where: { rut: rut }
    });

    if (!userFound) return [null, "Estudiante no encontrado"];

    const { password, ...userData } = userFound;

    return [userData, null];
  } catch (error) {
    console.error("Error obtener el estudiante:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getUsersService() {
  try {
    const userRepository = AppDataSource.getRepository(Estudiante);

    const users = await userRepository.find();

    if (!users || users.length === 0) return [null, "No hay estudiante"];

    const usersData = users.map(({ password, ...user }) => user);

    return [usersData, null];
  } catch (error) {
    console.error("Error al obtener a los estudiantes:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateUserService(query, body) {
  try {
    const { rut } = query;

    const userRepository = AppDataSource.getRepository(Estudiante);

    const userFound = await userRepository.findOne({
      where: { rut: rut }
    });

    if (!userFound) return [null, "Estudiante no encontrado"];

    if (body.email && body.email !== userFound.email) {
      const existingEmailUser = await userRepository.findOne({
        where: { email: body.email },
      });
      if (existingEmailUser) {
        return [null, "Ya existe un estudiante con el mismo email"];
      }
    }

    if (body.rut && body.rut !== userFound.rut) {
      const existingRutUser = await userRepository.findOne({
        where: { rut: body.rut },
      });
      if (existingRutUser) {
        return [null, "Ya existe un estudiante con el mismo rut"];
      }
    }
    
    if (body.password) {
      const matchPassword = await comparePassword(
        body.password,
        userFound.password,
      );

      if (!matchPassword) return [null, "La contraseña no coincide"];
    }

    const dataUserUpdate = {
      nombreCompleto: body.nombreCompleto,
      rut: body.rut,
      email: body.email,
      updatedAt: new Date(),
      esCEE: body.esCEE ?? userFound.esCEE,
    };

    if (body.newPassword && body.newPassword.trim() !== "") {
      dataUserUpdate.password = await encryptPassword(body.newPassword);
    }

    await userRepository.update({ id: userFound.id }, dataUserUpdate);

    const userData = await userRepository.findOne({
      where: { id: userFound.id },
    });

    if (!userData) {
      return [null, "Estudiante no encontrado después de actualizar"];
    }

    const { password, ...userUpdated } = userData;

    return [userUpdated, null];
  } catch (error) {
    console.error("Error al modificar un estudiante:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteUserService(query) {
  try {
    const { rut } = query;

    const userRepository = AppDataSource.getRepository(Estudiante);

    const userFound = await userRepository.findOne({
      where: { rut: rut }
    });

    if (!userFound) return [null, "Estudiante no encontrado"];

    const userDeleted = await userRepository.remove(userFound);

    const { password, ...dataUser } = userDeleted;

    return [dataUser, null];
  } catch (error) {
    console.error("Error al eliminar un estudiante:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function createUserService(user) {
  try {
    const userRepository = AppDataSource.getRepository(Estudiante);

    const { nombreCompleto, rut, email, password, esCEE } = user;

    const createErrorMessage = (dataInfo, message) => ({
      dataInfo,
      message
    });
    
    const existingEmailUser = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (existingEmailUser) return [null, createErrorMessage("email", "Correo electrónico en uso")];

    const existingRutUser = await userRepository.findOne({
      where: {
        rut,
      },
    });
    
    if (existingRutUser) return [null, createErrorMessage("rut", "Rut ya asociado a un estudiante")];

    const newUser = userRepository.create({
      nombreCompleto,
      email,
      rut,
      password: await encryptPassword(password),
      esCEE: esCEE ?? false,
    });

    await userRepository.save(newUser);

    const { password: _, ...userData } = newUser;

    return [userData, null];
  } catch (error) {
    console.error("Error al registrar un estudiante", error);
    return [null, "Error interno del servidor"];
  }
}