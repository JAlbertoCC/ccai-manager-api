//maneja el envío de correos electrónicos
import nodemailer from 'nodemailer';

// Configura el transporte de correo electrónico (por ejemplo, usando el servicio SMTP de Gmail)
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'tu_correo@gmail.com',
    pass: 'tu_contraseña'
  }
});

export const sendPasswordResetEmail = (email, resetToken) => {
  const mailOptions = {
    from: 'correo_institucional@tese.edu.mx',
    to: email,
    subject: 'Restablecimiento de contraseña',
    text: `Haz clic en el siguiente enlace para restablecer tu contraseña: http://tu_sitio/reset-password/${resetToken}`
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