import * as ed25519 from '@noble/ed25519';

/**
 * Generate a new Ed25519 keypair and sign a message
 */
export async function signMessage(message: string) {
  // Generate random private key
  const privateKey = ed25519.utils.randomPrivateKey();
  const publicKey = await ed25519.getPublicKeyAsync(privateKey);

  // Sign the message
  const messageBytes = new TextEncoder().encode(message);
  const signature = await ed25519.signAsync(messageBytes, privateKey);

  // Convert to hex strings
  const publicKeyHex = Buffer.from(publicKey).toString('hex');
  const signatureHex = Buffer.from(signature).toString('hex');

  // Generate DID (Decentralized Identifier)
  const did = `did:key:z${Buffer.from(publicKey).toString('base64').replace(/=/g, '')}`;

  return {
    signature: signatureHex,
    publicKey: publicKeyHex,
    did,
  };
}

/**
 * Verify an Ed25519 signature
 */
export async function verifySignature(
  message: string,
  signatureHex: string,
  publicKeyHex: string
): Promise<boolean> {
  try {
    const messageBytes = new TextEncoder().encode(message);
    const signature = Buffer.from(signatureHex, 'hex');
    const publicKey = Buffer.from(publicKeyHex, 'hex');

    return await ed25519.verifyAsync(signature, messageBytes, publicKey);
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}
