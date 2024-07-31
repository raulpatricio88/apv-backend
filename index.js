import express from "express";
import 'dotenv/config';
import cors from 'cors'; //segun juan es backend
import conectarDB from './config/db.js'; // cuando son dependencias no se pone extension pero cuando son archivos customizados si se pone
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';

const app = express();
app.use(express.json()); // de esta forma le decimos que vamos a enviar datos de tipo JSON

//dotenv.config();

conectarDB();
//'http://localhost:4173' corresponde a deployment preview
const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback) {
        if(dominiosPermitidos.indexOf(origin) !== -1) {
            // El origen del request esta permitido
            callback(null, true)
        } else {
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(cors({origin: '*'}));

//routing propio de express
app.use('/api/veterinarios', veterinarioRoutes );
app.use('/api/pacientes', pacienteRoutes );

const PORT = process.env.PORT || 4000 // si no existe la variable port entonces que se conecte al puerto 4000 (backend)

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});

