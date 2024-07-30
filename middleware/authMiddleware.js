import jwt from 'jsonwebtoken';
import Veterinario from '../models/Veterinario.js';

const checkAuth = async (req, res, next) => {
    //console.log("Desde mi middleware");
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        //console.log('Si tiene el token con bearer');
        try {
            token = req.headers.authorization.split(' ')[1]; // corta la palabra 'Bearer' para quedarse unicamente con el token que esta en la posicion 1 ([0: 'Bearer', 1: token])
            // decodificar el token: traerse los datos:
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //console.log(decoded)
            req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado"); // req.veterinario: crea una sesion con la info de veterinario
            return next();
            
        } catch (error) {
            const e = new Error('Token no valido');
            return res.status(403).json({ msg: e.message });
        }
    } 

    // Si llegamos a esta linea de codigo es porque nunca hubo un token
    if(!token) {
        const error = new Error('Token no valido o inexistente');
        res.status(403).json({ msg: error.message });
    }

    next();
};

export default checkAuth;