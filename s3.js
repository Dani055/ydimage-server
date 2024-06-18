import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import dotenv from 'dotenv';
dotenv.config()

const client = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.S3_REGION
})

export async function uploadPhotos(files) {
    const commands = files.map(file => {
        return new Upload({
            client,
            params: {
                Bucket: process.env.S3_BUCKET,
                Key: "semester3/" + Date.now() + "_" + file.originalname,
                Body: file.buffer,
            }
        });
    })
    try {
        const responses = await Promise.all(commands.map(command => command.done()));
        const links = []
        for (let response of responses) {
            if(response['$metadata'].httpStatusCode === 200){
                links.push(response.Location)
            }
        }
        return links;

    } catch (error) {
        throw new Error('Error uploading file:', error);
    }
}
