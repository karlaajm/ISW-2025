"use strict";
import Joi from "joi";

export const documentoBodyValidation = Joi.object({
  nombre: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\-_]+$/)
    .required()
    .messages({
      "string.empty": "El nombre no puede estar vacío.",
      "string.base": "El nombre debe ser de tipo string.",
      "string.min": "El nombre debe tener como mínimo 3 caracteres.",
      "string.max": "El nombre debe tener como máximo 50 caracteres.",
      "string.pattern.base":
        "El nombre solo puede contener letras, números, espacios, guiones y guiones bajos.",
      "any.required": "El campo nombre es obligatorio.",
    }),

  ID_Estudiante: Joi.number().required().messages({
    "number.base": "ID_Estudiante debe ser un número.",
    "any.required": "El campo ID_Estudiante es obligatorio.",
  }),

  fecha_subida: Joi.date().optional().messages({
    "date.base": "fecha_subida debe ser una fecha válida.",
  }),

  archivo_base64: Joi.string()
    .base64({ paddingRequired: false })
    .optional()
    .messages({
      "string.base": "archivo_base64 debe ser una cadena de texto.",
      "string.base64": "archivo_base64 debe ser una cadena Base64 válida.",
    }),
})
  .required()
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing": "Debes proporcionar los campos necesarios.",
  });

export const documentoQueryValidation = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": "El id debe ser un número.",
    "number.integer": "El id debe ser un entero.",
    "number.positive": "El id debe ser un número positivo.",
    "any.required": "El id es obligatorio.",
  }),
})
  .required()
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
  });
