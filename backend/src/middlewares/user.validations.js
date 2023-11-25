import { body, validationResult } from "express-validator";

export const validarUsuario = [
  body("username")
    .notEmpty()
    .withMessage("Por favor el username no debe estar vacio")
    .isLength({ min: 5 })
    .withMessage("el username debe tener al menos 5 caracteres"),

  body("email").isEmail().withMessage("Ingrese un mail válido"),

  body("password")
    .notEmpty()
    .withMessage("El password es obligatorio")
    .isLength({ min: 5 })
    .withMessage("Longitud minima del password es de 5 caracteres"),
];

export const manejarErroresValidacion = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json(error);
  }

  next();
};