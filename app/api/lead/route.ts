import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

// =========================================================================
// POST /api/lead — captura de lead (email + tipo de animal + consentimento).
// Por ora: valida, exige consentimento RGPD e persiste em /data/leads.json.
// TODO: integrar com um ESP (Brevo/Mailchimp) ou CRM. Substituir a persistência
// em ficheiro (não funciona em serverless read-only) por uma chamada externa.
// =========================================================================

export const runtime = 'nodejs';

interface LeadPayload {
  email?: string;
  animal?: string;
  consent?: boolean;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 });
  }

  const email = (body.email ?? '').trim().toLowerCase();
  const animal = body.animal === 'chat' ? 'chat' : 'chien';

  // Consentimento RGPD obrigatório.
  if (!body.consent) {
    return NextResponse.json({ error: 'Consentement requis.' }, { status: 422 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Email invalide.' }, { status: 422 });
  }

  const lead = {
    email,
    animal,
    consent: true,
    createdAt: new Date().toISOString(),
  };

  // Log (visível nos logs Vercel).
  console.log('[lead]', lead);

  // Persistência local best-effort (ignora falhas em ambiente read-only).
  try {
    const dataDir = path.join(process.cwd(), 'data');
    fs.mkdirSync(dataDir, { recursive: true });
    const file = path.join(dataDir, 'leads.json');
    const existing = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : [];
    existing.push(lead);
    fs.writeFileSync(file, JSON.stringify(existing, null, 2));
  } catch (err) {
    // Em serverless (Vercel) o FS é read-only: o log ci-dessus reste la source.
    console.warn('[lead] persistência local indisponível:', (err as Error).message);
  }

  return NextResponse.json({ ok: true });
}
