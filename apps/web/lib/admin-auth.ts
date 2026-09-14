import { createHash } from 'crypto';

export function getSessionToken(): string {
  return createHash('sha256')
    .update(process.env.ADMIN_PASSWORD! + 'aspekt-admin-v1')
    .digest('hex');
}
