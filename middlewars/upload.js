import multer from 'multer';
import path from 'path';

// multer config indicate where to store file and wich name to use
const destination = path.resolve('tempFiles'); // path to  tempFiles folder from  project root where to save file before controller function

const storage = multer.diskStorage({
  destination,

  filename: function (req, file, cb) {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`; // creat uniqe file name
    cb(null, `${uniquePrefix}_${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
