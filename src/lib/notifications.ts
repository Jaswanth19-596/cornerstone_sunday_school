import emailjs from '@emailjs/browser';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const notificationsEnabled = Boolean(serviceId && templateId && publicKey);

export async function sendSignupNotification(params: { week: string; change: string; summary: string }) {
  if (!notificationsEnabled) return;
  await emailjs.send(serviceId, templateId, {
    sunday_date: params.week,
    signup_change: params.change,
    signup_summary: params.summary || 'No commitments yet.',
  }, { publicKey });
}
