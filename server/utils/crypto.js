import { createHash, randomBytes } from 'crypto';

export function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = createHash('sha256')
    .update(password + salt)
    .digest('hex');
  return `${salt}:${hash}`;
}

export function comparePasswords(password, hashedPassword) {
  const [salt, hash] = hashedPassword.split(':');
  const newHash = createHash('sha256')
    .update(password + salt)
    .digest('hex');
  return hash === newHash;
}