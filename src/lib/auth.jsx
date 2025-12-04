export function useAuth(...args) {
  // eslint-disable-next-line no-console
  if (import.meta.env.DEV) console.warn('Placeholder: useAuth is not implemented yet.', args);
  return null;
}

function toast(...args) {
  // eslint-disable-next-line no-console
  if (import.meta.env.DEV) console.warn('Placeholder: toast is not implemented yet.', args);
  return null;
}

export { toast };