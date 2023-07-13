//maneja el envío de correos electrónicos
import nodemailer from 'nodemailer';

// Configura el transporte de correo electrónico (por ejemplo, usando el servicio SMTP de Gmail)

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ccai.tese0101@gmail.com',
    pass: 'TESECCAI'
  }
});

export const sendPasswordResetEmail = (institutional_email, token) => {
  const mailOptions = {
    from: 'ccai.tese0101@gmail.com',
    to: institutional_email,
    subject: 'Restablecimiento de contraseña',
    text: `Haz clic en el siguiente enlace para restablecer tu contraseña: http://tu_sitio/reset-password/${token}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo electrónico:', error);
    } else {
      console.log('Correo electrónico enviado:', info.response);
    }
  });
};

// Se debera crear un correo de gmail para el ccai asi
// se podra manejar el envio de la pagina para restablecer la contraseña