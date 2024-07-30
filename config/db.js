import mongoose from 'mongoose'

const conectarDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, 
        {
            // useNewUrlParser: true, //lo requiere mongoose
            // useUnifiedTopology: true,
        }
    );    

    const url = `${db.connection.host}:${db.connection.port}` //esto nos da una URL y el puerto al cual se esta conectando
    console.log(`MongoDB conectado en: ${url} `);

    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1);
    }
};

export default conectarDB;