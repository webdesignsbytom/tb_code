// Function to convert ArrayBuffer to hex string (used internally by sha256)
export function arrayBufferToHex(buffer) {
  return Array.prototype.map
    .call(new Uint8Array(buffer), (byte) =>
      ('00' + byte.toString(16)).slice(-2)
    )
    .join('');
}

// Function to encode a message with SHA-256
export async function sha256(item) {
  const encoder = new TextEncoder();
  const data = encoder.encode(item);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return arrayBufferToHex(hashBuffer);
}

// Example function that uses sha256
export async function processMessage(messageItem) {
  const hashedMessage = await sha256(messageItem.message);
  const hashedUser = await sha256(messageItem.username);

  return { hashedMessage, hashedUser }; 
}
