const AWS = require('aws-sdk');

class StorageService {
  constructor() {
    this._S3 = new AWS.S3({ region: `${process.env.AWS_BUCKET_REGION}` });
  }

  writeFile(file, meta) {
    const parameter = {
      Bucket: process.env.AWS_BUCKET_NAME, // Bucket Name
      Key: +new Date() + meta.filename, // Filename
      Body: file._data, // Buffer
      ContentType: meta.headers['content-type'], // MIME Type
    };

    return new Promise((resolve, reject) => {
      this._S3.upload(parameter, (error, data) => {
        if (error) {
          return reject(error);
        }

        return resolve(data.Location);
      });
    });
  }
}

module.exports = StorageService;
