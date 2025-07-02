"use strict";
import Joi from "joi";

const domainEmailValidator = (value, helper) => {
  if (!value.endsWith("@alumnos.ubiobio.cl")) {
    return helper.message(
      "El correo electrónico debe finalizar en @alumnos.ubiobio.cl"
    );
  }
  return value;
};

export const authValidation = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.empty": "El correo electrónico no puede estar vacío.",
      "any.required": "El correo electrónico es obligatorio.",
      "string.base": "El correo electrónico debe ser de tipo texto.",
      "string.email": "El correo electrónico debe finalizar en @alumnos.ubiobio.cl",
    })
    .custom(domainEmailValidator, "Validación dominio email"),
  password: Joi.string()
    .min(5)
    .max(35)
    .required()
    .messages({
      "string.empty": "La contraseña no puede estar vacía.",
      "any.required": "La contraseña es obligatoria.",
      "string.base": "La contraseña debe ser de tipo texto.",
      "string.min": "La contraseña debe tener al menos 5 caracteres.",
      "string.max": "La contraseña debe tener como máximo 35 caracteres.",
    }),
}).unknown(false).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

export const registerValidation = Joi.object({
  nombreCompleto: Joi.string()
    .min(10)
    .max(60)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .required()
    .messages({
      "string.empty": "El nombre completo no puede estar vacío.",
      "any.required": "El nombre completo es obligatorio.",
      "string.base": "El nombre completo debe ser de tipo texto.",
      "string.min": "El nombre completo debe tener al menos 10 caracteres.",
      "string.max": "El nombre completo debe tener como máximo 60 caracteres.",
      "string.pattern.base": "El nombre completo solo puede contener letras y espacios.",
    }),
    rut: Joi.string()
    .min(9)
    .max(12)
    .required()
    .pattern(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/)
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.base": "El rut debe ser de tipo string.",
      "string.min": "El rut debe tener como mínimo 9 caracteres.",
      "string.max": "El rut debe tener como máximo 12 caracteres.",
      "string.pattern.base": "Formato rut inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.empty": "El correo electrónico no puede estar vacío.",
      "any.required": "El correo electrónico es obligatorio.",
      "string.base": "El correo electrónico debe ser de tipo texto.",
      "string.email": "El correo electrónico debe finalizar en @alumnos.ubiobio.cl",
      })
    .custom(domainEmailValidator, "Validación dominio email"),
  password: Joi.string()
    .min(5)
    .max(35)
    .required()
    .messages({
      "string.empty": "La contraseña no puede estar vacía.",
      "any.required": "La contraseña es obligatorio.",
      "string.base": "La contraseña debe ser de tipo texto.",
      "string.min": "La contraseña debe tener al menos 5 caracteres.",
      "string.max": "La contraseña debe tener como máximo 35 caracteres.",
    }),
  esCEE: Joi.boolean()
    .messages({
      "boolean.base": "El campo esCEE debe ser de tipo booleano.",
      "boolean.empty": "El campo esCEE no puede estar vacío.",
    })  
})
  .unknown(false)
  .messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});