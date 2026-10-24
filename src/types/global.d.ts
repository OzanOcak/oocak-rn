declare global {
  var crypto: {
    getRandomValues<T extends ArrayBufferView>(array: T): T;
  };
}

export {};
