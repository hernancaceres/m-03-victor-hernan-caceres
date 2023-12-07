// import { body, validationResult } from "express-validator";

// export const validarUsuario = [
//   body("username")
//     .notEmpty()
//     .withMessage("Por favor el Nombre no debe estar vacio")
//     .isLength({ min: 5 })
//     .withMessage("el Nombre debe tener al menos 5 caracteres"),

//   body("email").isEmail().withMessage("Ingrese un email válido"),

//   body("password")
//     .notEmpty()
//     .withMessage("El password es obligatorio")
//     .isLength({ min: 5 })
//     .withMessage("Longitud minima del password 5 caracteres"),
// ];

// export const manejarErroresValidacion = (req, res, next) => {
//   const error = validationResult(req);

//   if (!error.isEmpty()) {
//     return res.status(400).json(error);
//   }

//   next();
// };


import { body, validationResult } from "express-validator";

export const validarRegistro = [
  body("username")
    .notEmpty()
    .withMessage("Por favor, el nombre no debe estar vacío")
    .isLength({ min: 5 })
    .withMessage("El nombre debe tener al menos 5 caracteres"),

  body("email").isEmail().withMessage("Ingrese un email válido"),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 5 })
    .withMessage("Longitud mínima de la contraseña: 5 caracteres"),
];

export const validarLogin = [
  body("email").isEmail().withMessage("Ingrese un email válido"),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 5 })
    .withMessage("Longitud mínima de la contraseña: 5 caracteres"),
];

export const manejarErroresValidacion = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
