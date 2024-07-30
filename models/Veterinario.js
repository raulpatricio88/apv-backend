import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // es una libreria para hash
import generarId from '../helpers/generarId.js';

const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        default: null,  // quiere decir que el telefono no es obligatorio
        trim: true
    },
    web: {
        type: String,
        default: null,
    },
    token: {
        type: String,
        default: generarId(),
    },
    confirmado: {
        type: Boolean,
        default: false // mas tarde cambiara a true cuando se haya confirmado el email
    }
});

// antes de guardar el veterinarioSchema, agrega salt (rondas de hasheo)...
veterinarioSchema.pre('save', async function(next) { // cuando se pone function hace referencia al objeto actual y el callback + arrow function son para la ventana global
   // console.log(this); // muestra el usuario con sus atributos

    // Si el password esta hasheado no lo vuelve a hashear:
    if(!this.isModified('password')) {
        next(); // para irse al siguiente middleware, middleware son las lineas que estan en index.js
    }
   const salt = await bcrypt.genSalt(10)
   this.password = await bcrypt.hash(this.password, salt);
}); 

veterinarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password); // this.password: el password de veterinarioSchema (bd)
};

const Veterinario = mongoose.model("Veterinario", veterinarioSchema);
export default Veterinario;