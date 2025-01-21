export const ExtendedSymbol = (description: string | number): symbol => {
  const key = `@django/core-12443a7e-c199-4c8a-a605-b07e45769610-${description}`;
  return Symbol(key);
};
