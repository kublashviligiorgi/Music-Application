import { Injectable } from "@nestjs/common";
import * as AWS from 'aws-sdk'
import { MimeType } from "aws-sdk/clients/kendra";
import { stringify } from "querystring";

@Injectable()
export class S3Services {
    private s3Client: AWS.S3;
    constructor() {
        this.s3Client = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'eu-north-1',
            signatureVersion: 'v4'
        })
    }
    async upload(file: Express.Multer.File, key: string) {

        const buffer = file.buffer;

        const fileKey = key;

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileKey, 
            Body: buffer,
            ContentType: file.mimetype,
            ContentDisposition: 'inline',
            CreateBucketConfiguration: {
                LocationConstraint: 'eu-north-1',
            }
        }
        try {
            return await this.s3Client.upload(params).promise()
        } catch (e) {
            throw e
        }
    }

    async getPresignedUrl(key: string) {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            Expires: 3600
        };

        try {

            const url = await this.s3Client.getSignedUrlPromise('getObject', params)

            return url
        } catch (error) {
            console.log(`Failed to get presignet URL for Key ${key}`, error.stack)
        }
    }

}