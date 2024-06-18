// const multer = require('multer')
// const path = require('path')

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '../images'))
//     },
//     filename: function (req, file, cb) {
//         cb(null, new Date().toISOString().replace(/[:.]/g, '-')+ "-" + file.originalname);
//     }
// })

// const upload = multer({ storage })

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


module.exports =upload;



