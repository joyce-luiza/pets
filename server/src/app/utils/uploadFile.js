import firebaseStorage from "../../config/firebase";
import { cleanObject } from "../utils/cleanObject";
import moment from "moment";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Objeto que representa um arquivo enviado pelo multer.
 * @typedef {Object} MulterFile
 * @property {string} fieldname - O nome do campo no formulário.
 * @property {string} originalname - O nome original do arquivo.
 * @property {string} encoding - O tipo de codificação do arquivo.
 * @property {string} mimetype - O tipo MIME do arquivo.
 * @property {Buffer} buffer - O buffer contendo os dados do arquivo.
 * @property {number} size - O tamanho do arquivo em bytes.
 */

/**
 * Execute the strategy to send a file to Firebase Storage.
 *
 * @param {Object} data - Object containing file and folder
 * @param {MulterFile} data.file - File uploaded via Multer.
 * @param {string} data.folder - Folder to save file
 * @returns {Promise<string>} URL of the uploaded file in Firebase Storage.
 */
const uploadFile = async ({ file, folder }) => {
  try {
    if (!file) {
      this.throwError("Arquivo inválido", 400);
    }

    const treatedFileObj = cleanObject(file) || null;

    if (!treatedFileObj) {
      this.throwError("Arquivo inválido", 400);
    }

    const fileName = `${folder}/${moment().valueOf()}-${file.originalname}`;
    const storageRef = ref(firebaseStorage, fileName);
    const metadata = {
      contentType: file.mimetype,
    };

    await uploadBytes(storageRef, file.buffer, metadata);
    const url = getDownloadURL(storageRef);

    return {
      fileName,
      downloadURL: url,
    };
  } catch (error) {
    console.error("Erro ao enviar arquivo para o Firebase:", error.message);
    return null;
  }
};

export { uploadFile };
