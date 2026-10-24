import { sha256 } from '@noble/hashes/sha2.js';
import { utf8ToBytes } from '@noble/hashes/utils.js';

const CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';

function generateRandomString(length: number): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, b => CHARSET[b % CHARSET.length]).join('');
}

export function generateCodeVerifier(): string {
  return generateRandomString(64);
}

export function generateCodeChallenge(verifier: string): string {
  const hash = sha256(utf8ToBytes(verifier));

  const base64Chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = '';

  for (let i = 0; i < hash.length; i += 3) {
    const b1 = hash[i];
    const b2 = i + 1 < hash.length ? hash[i + 1] : 0;
    const b3 = i + 2 < hash.length ? hash[i + 2] : 0;
    const triplet = (b1 << 16) | (b2 << 8) | b3;

    result += base64Chars[(triplet >> 18) & 63];
    result += base64Chars[(triplet >> 12) & 63];
    result += i + 1 < hash.length ? base64Chars[(triplet >> 6) & 63] : '=';
    result += i + 2 < hash.length ? base64Chars[triplet & 63] : '=';
  }

  return result.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
