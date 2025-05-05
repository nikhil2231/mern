import express from "express";
import multer from "multer";
import path from 'path';

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Define a function to check file type
const checkFileType = (file, cb) => {
    const supportedTypes = /jpg|jpeg|png/;
    const extname = supportedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = supportedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb("Only images (jpg, jpeg, png) are supported");
    }
}

// Configure Multer with storage and file filter
const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
});

router.post('/', upload.single('image'), (req, res) => {
    console.log(req.body)
    res.send(`/${req.file.path}`);
});

export default router;
