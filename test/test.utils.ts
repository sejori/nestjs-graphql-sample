export const mockExports = (module: Record<string, unknown>) => {
  const clone = Object.create(module);
  for (const key in clone) {
    clone[key] = jest.fn();
  }
  return clone;
};
