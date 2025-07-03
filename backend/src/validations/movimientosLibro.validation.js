"use strict";
import Joi from "joi";

export const movimientoBodyValidation = Joi.object({
  monto: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      "number.base": "El monto debe ser un número.",
      "number.integer": "El monto debe ser un número entero.",
      "number.min": "El monto debe ser mayor o igual a 0.",
      "any.required": "El monto es obligatorio.",
    }),
  descripcion: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "La descripción no puede estar vacía.",
      "string.min": "La descripción debe tener al menos 2 caracteres.",
      "string.max": "La descripción debe tener como máximo 50 caracteres.",
      "any.required": "La descripción es obligatoria.", 
    }),
  tipo: Joi.string()
    .valid("Gasto", "Ganancia")
    .required()
    .messages({
      "any.only": "El tipo debe ser 'gasto' o 'ganancia'.",
      "any.required": "El tipo es obligatorio.",
    }),
  libroContable: Joi.number()
    .integer()
    .required()
    .messages({
      "any.required": "El libro contable es obligatorio.",
      "number.base": "El libro contable debe ser un número.",
    }),
}).unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
  });

export const movimientoUpdateValidation = Joi.object({
  monto: Joi.number()
    .integer()
    .min(0)
    .messages({
      "number.base": "El monto debe ser un número.",
      "number.integer": "El monto debe ser un número entero.",
      "number.min": "El monto debe ser mayor o igual a 0.",
    }),
  descripcion: Joi.string()
    .min(2)
    .max(50)
    .messages({
      "string.empty": "La descripción no puede estar vacía.",
      "string.min": "La descripción debe tener al menos 2 caracteres.",
      "string.max": "La descripción debe tener como máximo 50 caracteres.",
    }),
  tipo: Joi.string()
    .valid("Gasto", "Ganancia")
    .messages({
      "any.only": "El tipo debe ser 'gasto' o 'ganancia'.",
    }),
}).or("monto", "descripcion", "tipo")
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing": "Debes proporcionar al menos un campo para actualizar.",
  });