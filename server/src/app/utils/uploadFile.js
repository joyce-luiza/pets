import firebaseStorage from "../../config/firebase";
import sanitize from "../utils/sanitize";
import moment from "moment";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

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
 * @param {string} data.previousFilePath - Previous image path vinculated to an entity to be substituted
 * @returns {Promise<string>} URL of the uploaded file in Firebase Storage.
 */
const uploadFile = async ({
  file,
  folder,
  previousFilePath: previousImagePath,
}) => {
  try {
    if (!file) {
      throw new Error("Arquivo inválido");
    }

    const fileName = `${folder}/${moment().valueOf()}-${file.originalname}`;
    const storageRef = ref(firebaseStorage, fileName);
    const metadata = {
      contentType: file.mimetype,
    };

    await uploadBytes(storageRef, file.buffer, metadata);
    const url = await getDownloadURL(storageRef);

    if (previousImagePath) {
      const previousRef = ref(firebaseStorage, previousImagePath);

      await deleteObject(previousRef);
    }

    return url;
  } catch (error) {
    console.error("Erro ao enviar arquivo para o Firebase:", error.message);
    return null;
  }
};

export { uploadFile };
