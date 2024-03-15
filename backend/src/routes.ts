import multer from "multer"
import { Express} from "express";
import { Image } from "./entities/Image";

export function initializeRoutes(app: Express) {
    const upload = multer({ dest: '/app/uploads/'})

    app.post('/api/uploads', upload.single('file'), async function (req, res) {
        console.log(req.file);
        if (req.file) {
            const newImage = new Image();
            newImage.mimetype = req.file.mimetype;
            newImage.originalName = req.file.originalname;
            newImage.path = req.file.path;
            newImage.created_at = new Date();

            await newImage.save();
            res.json({ success: true, image: newImage });
            } else {
            res.json({ success: true });
            }
    });
}
