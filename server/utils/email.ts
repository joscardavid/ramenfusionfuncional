import nodemailer from 'nodemailer';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Reservation } from '@prisma/client';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendConfirmationEmail(reservation: Reservation) {
  const { customerEmail, customerName, date, timeSlot } = reservation;

  const formattedDate = format(date, "EEEE, d 'de' MMMM 'de' yyyy", {
    locale: es,
  });

  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #FF0000;">¡Gracias por su reservación!</h1>
      
      <p>Estimado/a ${customerName},</p>
      
      <p>Su reservación ha sido confirmada para el ${formattedDate} a las ${timeSlot}.</p>
      
      <div style="background-color: #f8f8f8; padding: 15px; margin: 20px 0; border-radius: 5px;">
        <h3 style="margin-top: 0;">Detalles de la Reservación:</h3>
        <ul style="list-style: none; padding: 0;">
          <li>Fecha: ${formattedDate}</li>
          <li>Hora: ${timeSlot}</li>
          <li>Nombre: ${customerName}</li>
        </ul>
      </div>
      
      <p>Si necesita modificar o cancelar su reservación, por favor contáctenos.</p>
      
      <p style="margin-top: 30px;">¡Esperamos recibirle pronto!</p>
      
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">
          Ramen Fusion<br>
          Av. Principal #123<br>
          Tel: +58 412 1234567
        </p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: customerEmail,
    subject: 'Confirmación de Reservación - Ramen Fusion',
    html: emailContent,
  });
}