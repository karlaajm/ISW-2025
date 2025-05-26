"use strict";
import Joi from "joi";

export const libroContableBodyValidation = Joi.object({
nombre: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\-_]+$/)
    .messages({
        "string.empty": "El nombre no puede estar vacío.",
        "string.base": "El nombre debe ser de tipo string.",
        "string.min": "El nombre debe tener como mínimo 3 caracteres.",
        "string.max": "El nombre debe tener como máximo 50 caracteres.",
        "string.pattern.base":
        "El nombre solo puede contener letras, números, espacios, guiones y guiones bajos.",
    }),
})
.required()
.unknown(false)
.messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing": "Debes proporcionar el campo nombre.",
});

export const libroContableQueryValidation = Joi.object({
nombre: Joi.string()
    .min(3)
    .max(255)
    .pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\-_]+$/)
    .messages({
        "string.empty": "El nombre no puede estar vacío.",
        "string.base": "El nombre debe ser de tipo string.",
        "string.min": "El nombre debe tener como mínimo 3 caracteres.",
        "string.max": "El nombre debe tener como máximo 255 caracteres.",
        "string.pattern.base":
        "El nombre solo puede contener letras, números, espacios, guiones y guiones bajos.",
    }),
})
.unknown(false)
.messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});