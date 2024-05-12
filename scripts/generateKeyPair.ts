import { generateKeyPairSync } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';

const generateKeyPair = (): void => {
  const keyPair = generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  });

  mkdirSync('.ssh');
  writeFileSync(`${process.cwd()}/.ssh/id_rsa_public.pem`, keyPair.publicKey);
  writeFileSync(`${process.cwd()}/.ssh/id_rsa_private.pem`, keyPair.privateKey);
};

export default generateKeyPair();
