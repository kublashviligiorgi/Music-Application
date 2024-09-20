import { Module } from '@nestjs/common';
import { S3Services } from './services/s3.services';

@Module({
    providers: [S3Services],
    exports: [S3Services]
})
export class AwsModule {}
