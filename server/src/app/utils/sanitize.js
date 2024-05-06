const sanitize = (input, removeNullProperties = true) => {
  if (Array.isArray(input)) {
    const sanitizedArray = input
      .map((item) => sanitize(item, removeNullProperties))
      .filter((item) => (removeNullProperties ? item !== null : true));
    return sanitizedArray.length > 0 ? sanitizedArray : null;
  }

  if (typeof input === "object" && input !== null) {
    const sanitizedObject = {};

    for (const key in input) {
      const value = input[key];
      const sanitizedValue = sanitize(value, removeNullProperties);

      if (removeNullProperties) {
        if (sanitizedValue !== null) {
          sanitizedObject[key] = sanitizedValue;
        }
      } else {
        sanitizedObject[key] = sanitizedValue;
      }
    }

    return Object.keys(sanitizedObject).length > 0 ? sanitizedObject : null;
  }

  return input === "" || input === undefined ? null : input;
};

export default sanitize;
