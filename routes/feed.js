const router = require('express').Router();
const feedController = require('../controllers/feed');
var multer  = require('multer');

var storage = multer.memoryStorage()

const upload = multer({ storage: storage, limits: {fileSize: 1 * 1024 * 1024, files: 10}, fileFilter: (req, file, cb) => {
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


router.get('/', feedController.test);
router.post('/uploadimg', upload.array('photo'), feedController.UploadImage);


module.exports = router;

// destination: function (req, file, cb) {
//     cb(null, './images/')
//   },
//   filename: function (req, file, cb) {
//       let extArray = file.mimetype.split("/");
//       let extension = extArray[extArray.length - 1];
//       cb(null, uuidv4() + '-' + Date.now()+ '.' + extension)
//   }