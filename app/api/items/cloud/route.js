
import { NextResponse } from 'next/server';
import {Storage} from '@google-cloud/storage'
import  stream from 'stream'
import imageType from 'image-type';



const storage = new Storage({keyFilename: process.env.GOOGLE_CLOUD_KEYFILE});
const bucket = storage.bucket('sportsmood')

export const POST = async (req) =>{
    try{
        const data = await req.json();
        
        const base64Data = data.imageBase64.replace(/^data:image\/\w+;base64,/, "");
        const imgBuffer = Buffer.from(base64Data, 'base64');
        const type = imageType(imgBuffer);

        // Create a stream to upload the file
        const bufferStream = new stream.PassThrough();
        bufferStream.end(imgBuffer);

        // Upload file to Google Cloud Storage
        const file = bucket.file(data.fileName);
        await new Promise((resolve, reject) => {
            bufferStream.pipe(file.createWriteStream({
                metadata: {
                    contentType: type,
                }
            }))
            .on('error', (error) => reject(error))
            .on('finish', resolve);
        });

        const url = `https://storage.googleapis.com/sportsmood/${data.fileName}`
        // Return the URL in the response
        return NextResponse.json({ url });
    }
    catch(err){
        throw new Error(err);
    }
}