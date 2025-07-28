import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export async function sendActaNotification(emails) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: emails,
        subject: 'Nuevo documento de Acta',
        text: 'Se ha subido un nuevo documento de Acta en la plataforma, Atte CEE.'
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo de acta enviado correctamente a:', emails);
        return true;
    } catch (error) {
        console.error('Error enviando notificación de acta:', error);
        return false;
    }
}
