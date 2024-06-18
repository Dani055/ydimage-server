import { Router } from 'express';
import multer from 'multer';
import { UploadImage, test } from '../controllers/feed.js';

const router = Router();
const storage = multer.memoryStorage()

const upload = multer({ storage: storage, limits: {fileSize: 1 * 1024 * 1024 * 3, files: 10}, fileFilter: (req, file, cb) => {
    console.log(file)
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
            cb(null, true);
        }
        else{
            console.log('Skipped upload due to incorrect image format')
            cb(null, false)
            return
        }
    } 
})


router.get('/', test);
router.post('/uploadimg', upload.array('photo'), UploadImage);

export default router;

// destination: function (req, file, cb) {
//     cb(null, './images/')
//   },
//   filename: function (req, file, cb) {
//       let extArray = file.mimetype.split("/");
//       let extension = extArray[extArray.length - 1];
//       cb(null, uuidv4() + '-' + Date.now()+ '.' + extension)
//   }