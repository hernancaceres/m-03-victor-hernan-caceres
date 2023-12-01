import { body, validationResult } from "express-validator";

export const validarPost = [
  body("title")
    .notEmpty()
    .withMessage("El título del post no debe estar vacío")
    .isLength({ max: 255 })
    .withMessage("El título del post debe tener como máximo 255 caracteres"),

  body("description")
    .notEmpty()
    .withMessage("La descripción del post no debe estar vacía"),

  body("autor")
    .notEmpty()
    .withMessage("El autor del post es obligatorio"),

  body("imageURL")
    .optional()
    .isURL()
    .withMessage("La URL de la imagen no es válida"),

  // Puedes agregar más validaciones según tus necesidades
];

export const manejarErroresValidacionPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
