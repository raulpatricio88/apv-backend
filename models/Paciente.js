import mongoose from 'mongoose';

const pacientesSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    propietario: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    sintomas: {
        type: String,
        required: true,
    },
    veterinario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Veterinario', //para traernos la info de veterinario, 'Veterinario' corresponde al nombre del modelo de mongoose
    },    
}, {
    timestamps: true, //para que nos cree las columnas de editado y creado
});

const Paciente = mongoose.model("Paciente", pacientesSchema);

export default Paciente;