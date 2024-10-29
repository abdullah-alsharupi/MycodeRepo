// import crypto, { CipherGCMTypes } from "crypto";

// const algorithm: CipherGCMTypes = 'aes-256-gcm';
// const key: string = 'a_very_long_and_secure_32_byte_k'; // Use a secure, long, and unique key

// export const encrypt = (text: string): string => {
//   const iv = crypto.randomBytes(12);
//   const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
//   let encrypted = cipher.update(text, 'utf8', 'hex');
//   encrypted += cipher.final('hex');
//   const tag = cipher.getAuthTag().toString('hex');
//   return `${iv.toString('hex')}:${encrypted}:${tag}`;
// };

// export const decrypt = (text: string): string => {
//   try {
//       const [ivString, encryptedString, tagString] = text.split(':');
//       const iv = Buffer.from(ivString, 'hex');
//       const encrypted = Buffer.from(encryptedString, 'hex');
//       const tag = Buffer.from(tagString, 'hex');

//       const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
//       decipher.setAuthTag(tag);
//       let decrypted = decipher.update(encrypted);
//       decrypted = Buffer.concat([decrypted, decipher.final()]);

//       return decrypted.toString('utf8');
//   } catch (error) {
//       console.error('Error during decryption:', error);
//       throw error;
//   }
// }
import CryptoJS from 'crypto-js';

// دالة للتشفير

 const key="123456789"
 export function encrypt(message: string): string {
  const ciphertext = CryptoJS.AES.encrypt(message, key).toString();
  return ciphertext;
}

// دالة لفك التشفير
export function decrypt(ciphertext: string): string {
  const bytes  = CryptoJS.AES.decrypt(ciphertext, key);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}

export function encryptArray(array: string[]): string[] {
  return array.map(item => CryptoJS.AES.encrypt(item, key).toString());
}
export function decryptArray(encryptedArray: string[]): string[] {
  if (!encryptedArray) {
    return []; // Handle the case where encryptedArray is undefined
  }

  return encryptedArray.map(item => {
    const bytes = CryptoJS.AES.decrypt(item, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  });
}