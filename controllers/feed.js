import {uploadPhotos} from '../s3.js';


export const test = (req, res) => {
    res.send("Hello world!")
};
export const UploadImage = async (req, res, next) => {
    try {
        const links = await uploadPhotos(req.files);
        return res.status(200).json({
            message: `Uploaded ${req.files.length} files`,
            links
        })

    } catch (error) {
        console.log(error)
        res.status(500)
            .json({
                error
            })
    }
};
