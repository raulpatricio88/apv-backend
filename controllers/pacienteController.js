import Paciente from "../models/Paciente.js"; //modelo Paciente de mongoose

const agregarPaciente = async (req, res) => {
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;
    
    try {
        const pacienteAlmacenado = await paciente.save() // almacenado en base de datos
        res.json(pacienteAlmacenado);

    } catch (error) {
        console.log(error)
    }
};

const obtenerPacientes = async (req, res) => {
    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario); //.find(); trae todos los resultados como un arreglo y despues un json con la info
    // req.veterinario: variable de sesion del servidor de Express
    res.json(pacientes); 
};

const obtenerPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente) {
        res.status(404).json({ msg: "Paciente no encontrado" });
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString() ) { //._id es id de mongoDB, al compararlos hay que convertirlos a cadena
        return res.json({msg: 'Accion no valida'});
    }

    res.json(paciente); 
};

const actualizarPaciente = async (req, res) => {
    const { id } = req.params; // extraemos el id que le damos en la url de postman
    const paciente = await Paciente.findById(id);

    if(!paciente) {
        res.status(404).json({ msg: "Paciente no encontrado" });
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString() ) { //quien lo va a editar es quien lo creo y no otro
        return res.json({msg: 'Accion no valida'});
    }

    // Actualizar paciente
    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;

    try {
        const pacienteActualizado = await paciente.save();
        res.json(pacienteActualizado)
    } catch (error) {
        console.log(error);
    }

}
const eliminarPaciente = async (req, res) => {
    const { id } = req.params; // extraemos el id que le damos en la url de postman
    const paciente = await Paciente.findById(id);

    if(!paciente) {
        return res.status(404).json({ msg: "Paciente no encontrado" });
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString() ) { //quien lo va a editar es quien lo creo y no otro
        return res.json({msg: 'Accion no valida'});
    }

    try {
        await paciente.deleteOne() // deleteOne es de Mongoose
        res.json({ msg: "Paciente eliminado" });
    } catch (error) {
        console.log(error);
    }
};

export { 
    agregarPaciente, 
    obtenerPacientes, 
    obtenerPaciente, 
    actualizarPaciente, 
    eliminarPaciente 
};