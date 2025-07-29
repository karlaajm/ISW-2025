import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendActaNotification(
  emails,
  nombreArchivo = "un documento de Acta",
) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emails,
    subject: "Nuevo documento de Acta",
    html: `
	  <div style="font-size: 16px; font-family: Arial, sans-serif; background: #f4f6fb; padding: 32px 0;">
        <div style="max-width: 480px; margin: 0 auto; background: #fff; border-radius: 10px; box-shadow: 0 2px 8px #0001; padding: 32px 24px;">
          <h2 style="color: #2a3a8c; text-align: center; margin-bottom: 32px;">📄 Nuevo documento de Acta</h2>
          <p style="font-size: 1.1em; line-height: 1.6; color: #222; text-align: center; margin-bottom: 24px;">
            Se ha subido el archivo <b>"${nombreArchivo}"</b> en la plataforma de estudiantes.
          </p>
          <p style="font-size: 1.1em; line-height: 1.6; color: #222; text-align: center; margin-bottom: 24px;">
            Puedes revisarlo accediendo a la sección de documentos.
          </p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="http://146.83.198.35:1300/" style="background: #2a3a8c; color: #fff; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 1.1em;">Ir a la plataforma</a>
          </div>
          <p style="color: #555; text-align: center; margin-top: 48px; margin-bottom: 0; font-size: 1em;">Se despide,</p>
          <p style="color: #555; text-align: center; margin-top: 8px; margin-bottom: 32px; font-size: 1em;"><b>CEE</b></p>
        </div>
        <div style="text-align: center; color: #aaa; font-size: 0.9em; margin-top: 24px;">Este es un mensaje automático, por favor no responder.</div>
      </div>
    `,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo de acta enviado correctamente a:", emails);
    return true;
  } catch (error) {
    console.error("Error enviando notificación de acta:", error);
    return false;
  }
}
