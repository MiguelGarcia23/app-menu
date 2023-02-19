/* Importando el módulo Express */
const express = require('express');

/* Ejecutamos la función Router de Express */
const router = express.Router();

/* Importamos el controlador de proyectos */
const foodsController = require ('../controllers/foodsController');

/* Importamos el middleware Multer */
const multerMiddleware = require ('../middlewares/uploadImageFood');

/* Configuramos el envío de todas las comidas */
router.get ('/', foodsController.allFoods);

/* Configuramos el envío de cada comida */
router.get ('/:id', foodsController.foodDetail);

/* Configuramos la ruta de creación de comida */
router.post ('/create', multerMiddleware.single('image'), foodsController.create);

/* Configuramos la ruta de edición de comida */
router.post ('/edit/:id', multerMiddleware.single('image'), foodsController.edit);

/* Configuramos la ruta de inhabilitar comida */
router.post ('/unavailable/:id', foodsController.unavailable);

/* Exportamos la variable router */
module.exports = router;