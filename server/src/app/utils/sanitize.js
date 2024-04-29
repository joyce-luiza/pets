const sanitize = (input) => {
  if (Array.isArray(input)) {
    const sanitizedArray = input
      .map((item) => sanitize(item))
      .filter((item) => {
        if (Array.isArray(item)) {
          return item.length > 0;
        }
        return item !== null && item !== undefined && item !== "";
      });
    return sanitizedArray.length > 0 ? sanitizedArray : null;
  }

  if (typeof input === "object" && input !== null) {
    const sanitizedObject = {};

    for (const key in input) {
      if (
        input[key] !== undefined &&
        input[key] !== null &&
        input[key] !== ""
      ) {
        if (Array.isArray(input[key])) {
          const sanitizedArray = input[key]
            .map((item) => sanitize(item))
            .filter(
              (item) => item !== null && item !== undefined && item !== ""
            );
          if (sanitizedArray.length > 0) {
            sanitizedObject[key] = sanitizedArray;
          }
        } else if (typeof input[key] === "object") {
          const sanitizedValue = sanitize(input[key]);
          if (
            sanitizedValue !== null &&
            Object.keys(sanitizedValue).length > 0
          ) {
            sanitizedObject[key] = sanitizedValue;
          }
        } else {
          sanitizedObject[key] = input[key];
        }
      }
    }

    return Object.keys(sanitizedObject).length > 0 ? sanitizedObject : null;
  }

  return input;
};

export default sanitize;
