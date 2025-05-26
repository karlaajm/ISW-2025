"use strict";
import {
  createUserService,
  deleteUserService,
  getUserService,
  getUsersService,
  updateUserService,
} from "../services/estudiante.service.js";
import {
  userBodyValidation,
  userQueryValidation,
} from "../validations/estudiante.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function getUser(req, res) {
  try {
    const { rut } = req.query;
    
    const { error } = userQueryValidation.validate({ rut });

    if (error) return handleErrorClient(res, 400, error.message);

    const [user, errorUser] = await getUserService({ rut });

    if (errorUser) return handleErrorClient(res, 404, errorUser);

    handleSuccess(res, 200, "Estudiante encontrado", user);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getUsers(req, res) {
  try {
    const [users, errorUsers] = await getUsersService();

    if (errorUsers) return handleErrorClient(res, 404, errorUsers);

    users.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "Estudiantes encontrados", users);
  } catch (error) {
    handleErrorServer(
      res,
      500,
      error.message,
    );
  }
}

export async function updateUser(req, res) {
  try {
    const { rut } = req.query;
    const { body } = req;

    const { error: queryError } = userQueryValidation.validate({
      rut
    });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const { error: bodyError } = userBodyValidation.validate(body);

    if (bodyError)
      return handleErrorClient(
        res,
        400,
        "Error de validación en los datos enviados",
        bodyError.message,
      );

    const [user, userError] = await updateUserService({ rut }, body);

    if (userError) return handleErrorClient(res, 400, "Error modificando al estudiante", userError);

    handleSuccess(res, 200, "Estudiante modificado correctamente", user);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteUser(req, res) {
  try {
    const { rut } = req.query;

    const { error: queryError } = userQueryValidation.validate({
      rut
    });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const [userDelete, errorUserDelete] = await deleteUserService({
      rut
    });

    if (errorUserDelete) return handleErrorClient(res, 404, "Error eliminado al estudiante", errorUserDelete);

    handleSuccess(res, 200, "Estudiante eliminado correctamente", userDelete);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function createUser(req, res) {
  try {
    const { body } = req;

    const { error } = userBodyValidation.validate(body);

    if (error)
      return handleErrorClient(res, 400, "Error de validación", error.message);

    const [newUser, errorNewUser] = await createUserService(body);

    if (errorNewUser) return handleErrorClient(res, 400, "Error registrando al estudiante", errorNewUser);

    handleSuccess(res, 201, "Estudiante registrado con éxito", newUser);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}