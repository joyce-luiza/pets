export function generateQueryParams(filter) {
  const queryParams = Object.keys(filter)
    .filter((key) => filter[key].length > 0)
    .map((key, index) =>
      index > 0 ? `${key}=${filter[key]}` : `?${key}=${filter[key]}`
    )
    .join("&");

  return queryParams;
}
