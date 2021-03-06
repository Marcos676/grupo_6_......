var express = require('express');
var router = express.Router();
const {profile, logout,createAdmin, productAdd, createProcess, productDetail, productEdit, editProcess, productDelete, createAdminProcess} = require('../controllers/adminController')

const uploadProduct = require('../utils/uploadProduct')
const adminCheck = require('../middlewares/adminCheck');
const productValidator = require('../validations/productValidator');
const imgsCreateProductValidator = require('../validations/imgsCreateProductValidator');
const imgsEditProductValidator = require('../validations/imgsEditProductValidator');
const registerValidator = require('../validations/registerValidator');

/* Registrar admin */
router.get('/crear', createAdmin)
router.post('/crear', registerValidator, createAdminProcess)
/* Perfil */
router.get('/perfil', adminCheck, profile);
/* cerrar sesión */
router.get('/logout', logout)
/* Crear */
router.get('/products/create', adminCheck, productAdd);
router.post('/products/create', uploadProduct.any(), imgsCreateProductValidator, productValidator, createProcess);
/* detalle */
router.get('/products/:id', adminCheck, productDetail)
/* Editar */
router.get('/products/:id/edit', adminCheck, productEdit)
router.put('/products/:id', uploadProduct.any(), imgsEditProductValidator, productValidator, editProcess)
/* Borrar */
router.delete('/products/:id', productDelete)

module.exports = router;