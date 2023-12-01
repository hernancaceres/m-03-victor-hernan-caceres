import { body, validationResult } from "express-validator";

export const validarComentario = [
  body("autor")
    .notEmpty()
    .withMessage("El autor del comentario es obligatorio"),

  body("description")
    .notEmpty()
    .withMessage("La descripción del comentario no debe estar vacía")
    .isLength({ max: 300 })
    .withMessage("La descripción del comentario debe tener como máximo 300 caracteres"),

  body("post")
    .notEmpty()
    .withMessage("El post al que pertenece el comentario es obligatorio"),
];

export const manejarErroresValidacionComentario = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
