import { createHash } from 'crypto';

export function getSessionToken(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error('ADMIN_PASSWORD environment variable is not set');
  return createHash('sha256')
    .update(password + 'aspekt-admin-v1')
    .digest('hex');
}
