import 'dotenv/config';
import nodemailer from 'nodemailer'; // paquete instalado
//import { Resend } from 'resend'

const emailRegistro = async (datos) => {

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });


        const { email, nombre, token } = datos;
        
        // Enviar el email
        const info = await transporter.sendMail({
            from: '"APV - Administrador de pacientes de veterinaria" <prueba@correo.com>',
            to: email, // email del registro de usuario
            subject: 'Comprueba tu cuenta en APV',
            text: "Comprueba tu cuenta en APV",
            html: `<p>Hola: ${nombre}, comprueba tu cuenta en APV. </p>
                 <p>Tu cuenta está casi lista, solo debes comprobarla en el siguiente enlace:
                 <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a> </p>

                 <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
            
            `,
        });

        // const { data, error } = await resend.emails.send({
        //     from: '"APV - Administrador de pacientes de veterinaria" <apv@correo.com>',
        //     to: [`${email}`],
        //     subject: 'Comprueba tu cuenta en APV',
        //     html: `<p>Hola: ${nombre}, comprueba tu cuenta en APV. </p>
        //         <p>Tu cuenta está casi lista, solo debes comprobarla en el siguiente enlace:
        //         <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a> </p>

        //         <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
            
        //     `,
        // });
     console.log("Mensaje enviado: %s", info.messageId)
        
    
};

export default emailRegistro;