import express from 'express'
const router = express.Router();
import { registrar, 
         perfil, 
         confirmar, 
         autenticar,
         olvidePassword,
         comprobarToken,
         nuevoPassword,
         actualizarPerfil,
         actualizarPassword 
        } from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js';        

// Area publica
router.post('/', registrar );
// routing dinamico
router.get('/confirmar/:token', confirmar); //:token es un parametro dinamico para la URL, aqui le dimos el nombre de token pero puede tener cualquiera
router.post('/login', autenticar);
router.post("/olvide-password", olvidePassword );
// router.get('/olvide-password/:token', comprobarToken)
// router.post('/olvide-password/:token', nuevoPassword)

// la siguiente es una forma resumida de poner las 2 lineas de codigo anteriores
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword)

// Area privada
router.get('/perfil', checkAuth, perfil);
router.put('/perfil/:id', checkAuth, actualizarPerfil )
router.put('/actualizar-password', checkAuth, actualizarPassword)

export default router;