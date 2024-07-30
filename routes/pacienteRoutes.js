import express from 'express';
const router = express.Router();
import {
    agregarPaciente, 
    obtenerPacientes, 
    obtenerPaciente, 
    actualizarPaciente, 
    eliminarPaciente
} from "../controllers/pacienteController.js";
import checkAuth from '../middleware/authMiddleware.js';


router
    .route('/') //corresponde a '/api/pacientes' (en index.js le dimos la ruta y lo asociamos con pacienteRoutes)
    .post(checkAuth, agregarPaciente)
    .get(checkAuth, obtenerPacientes);

// CRUD de paciente    
router
    .route('/:id')    //id del paciente obtenido de Object id de mongoDB. ruta: api/pacientes/:id
    .get(checkAuth, obtenerPaciente) // get desde /pacientes/id para traer un paciente
    .put(checkAuth, actualizarPaciente)
    .delete(checkAuth, eliminarPaciente)

export default router;