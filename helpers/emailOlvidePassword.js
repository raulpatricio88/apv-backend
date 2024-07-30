import 'dotenv/config';
//import nodemailer from 'nodemailer'; // paquete instalado
import { Resend } from 'resend'

const emailOlvidePassword = async (datos) => {

    // const transport = nodemailer.createTransport({
    //     host: process.env.EMAIL_HOST,
    //     port: process.env.EMAIL_PORT,
    //     auth: {
    //       user: process.env.EMAIL_USER,
    //       pass: process.env.EMAIL_PASS
    //     }
    //   });
    try {
        const resend = new Resend('re_URvuH42h_LF4ECQ3Hx2cU7GBZ3nVdhkox');

        const { email, nombre, token } = datos;
        // no sirve, errores de MailTrap, pero continuamos de todas formas:
        // Enviar el email
        // const info = await transport.sendMail({
        //     from: '"APV - Administrador de pacientes de veterinaria" <prueba@correo.com>',
        //     to: email,
        //     subject: 'Reestablece tu password',
        //     text: "Reestablece tu password",
        //     html: `<p>Hola: ${nombre}, has solicitado reestablecer tu password. </p>

        //          <p>Sigue el siguiente enlace para generar un nuevo password:
        //          <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">REstablecer password</a> </p>

        //          <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
            
        //     `,
        // });

        const { data, error } = await resend.emails.send({
            from: '"APV - Administrador de pacientes de veterinaria" <apv@correo.com>',
            to: [`${email}`],
            subject: 'Comprueba tu cuenta en APV',
            html: `<p>Hola: ${nombre}, comprueba tu cuenta en APV. </p>
                <p>Tu cuenta está casi lista, solo debes comprobarla en el siguiente enlace:
                <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a> </p>

                <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
            
            `,
        });
    // console.log("Mensaje enviado: %s", info.messageId)
        if (error) {
            return console.error({ error });
        }
        console.log({ data });

    } catch (error) {
        console.log(error);
    }
    
}

export default emailOlvidePassword