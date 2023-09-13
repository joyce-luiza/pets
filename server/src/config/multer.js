import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/app/assets/images');
    },
    filename: (req, file, cb) => {
        cb(null, ${Date.now()}-${path.basename(file.originalname)});
    },
});

const upload = multer({ storage });

export default upload;