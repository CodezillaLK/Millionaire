export const generateSHA256 = async (string) => {
  const utf8 = new TextEncoder().encode(string);

  return await crypto.subtle.digest("SHA-256", utf8).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, "0"))
      .join("");

    return hashHex;
  });
};

export const generateSHA512 = async (string) => {
  const utf8 = new TextEncoder().encode(string);

  return await crypto.subtle.digest("SHA-512", utf8).then((buf) => {
    const hashArray = Array.from(new Uint8Array(buf));

    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, "0"))
      .join("");

    return hashHex;
  });
};
