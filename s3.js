var {S3} = require('aws-sdk');

module.exports = {
    uploadPhotos: async function (files){

        const s3 = new S3()

        const params = files.map(file => {
            return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: "semester3/" + Date.now() + "_" + file.originalname,
            Body: file.buffer,
            };
        })
        
        const results = await Promise.all(params.map(param => s3.upload(param).promise()))

        return results;
    }
} 