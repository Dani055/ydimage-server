module.exports = {
    test: (req, res) => {
        res.send("Hello world!")
    },
    
    UploadImage: async (req, res, next) => {
        try {
            let urls = [];
            req.files.forEach(element => {
                urls.push(req.protocol + '://' + req.get('host') + "/" + element.path.replaceAll('\\', '/'));
            })

            urls.forEach(element => {
                console.log(element);
            });
            res.status(200).json({
                message: "Upload successfull",
                urls: urls
            })
            
        } catch (error) {
            res.status(500)
            .json({
                error
            })
        }
    }
}