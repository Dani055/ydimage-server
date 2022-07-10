var s3 = require('../s3.js');

module.exports = {
    test: (req, res) => {
        res.send("Hello world!")
    },
    UploadImage: async (req, res, next) => {
        try {
            const results = await s3.uploadPhotos(req.files);
            let urls = [];
            results.forEach(result => {
                urls.push(result.Location)
            });
            return res.status(200).json({
                message: `Uploaded ${req.files.length} files`,
                links: urls
            })
            
        } catch (error) {
            console.log(error)
            res.status(500)
            .json({
                error
            })
        }
    }
}