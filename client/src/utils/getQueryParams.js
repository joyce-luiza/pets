export function getQueryParams(search) {
  const params = new URLSearchParams(search);
  const result = {};
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  return result;
}
