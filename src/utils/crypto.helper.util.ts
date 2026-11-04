import { randomBytes, scryptSync, createCipheriv, createDecipheriv } from "node:crypto";

export const deriveKey = (master: string, salt: Buffer) =>
  scryptSync(master, salt, 32);

export function encrypt(key: Buffer, plaintext: string) {
  const nonce = randomBytes(12); // fresh per entry, never reuse
  const cipher = createCipheriv("aes-256-gcm", key, nonce);
  const enc = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  return { nonce, data: Buffer.concat([enc, cipher.getAuthTag()]) };
}

export function decrypt(key: Buffer, nonce: Buffer, data: Buffer) {
  const tag = data.subarray(data.length - 16);
  const enc = data.subarray(0, data.length - 16);
  const decipher = createDecipheriv("aes-256-gcm", key, nonce);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(enc), decipher.final()]).toString("utf8");
}