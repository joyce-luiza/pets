export default class File {
  constructor({
    fieldname = "",
    originalname = "",
    encoding = "",
    mimetype = "",
    buffer = "",
    size = "",
  } = {}) {
    this.fieldname = fieldname;
    this.originalname = originalname;
    this.encoding = encoding;
    this.mimetype = mimetype;
    this.buffer = buffer;
    this.size = size;
  }
}
