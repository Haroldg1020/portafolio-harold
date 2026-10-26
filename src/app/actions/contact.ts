"use server";

import { Resend } from 'resend';
import { z } from 'zod';
import { site } from '@/config/site';

export type ContactField = 'name' | 'email' | 'message';

export type ContactState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; fields?: ContactField[]; values: Record<ContactField, string> };

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.email().max(200),
  message: z.string().trim().min(10).max(5000),
});

export async function sendContactMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field
  if (formData.get('company')) return { status: 'success' };

  // Sent back on errors so the form can keep what the visitor typed
  const values = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    message: String(formData.get('message') ?? ''),
  };

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((issue) => issue.path[0] as ContactField))];
    return { status: 'error', fields, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Contact form: RESEND_API_KEY is not set');
    return { status: 'error', values };
  }

  const { name, email, message } = parsed.data;
  const { error } = await new Resend(apiKey).emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? 'Portafolio <onboarding@resend.dev>',
    to: process.env.CONTACT_TO_EMAIL ?? site.email,
    replyTo: email,
    subject: `Nuevo mensaje del portafolio — ${name}`,
    text: `Nombre: ${name}\nCorreo: ${email}\n\n${message}`,
  });

  if (error) {
    console.error('Contact form: Resend error', error);
    return { status: 'error', values };
  }
  return { status: 'success' };
}
