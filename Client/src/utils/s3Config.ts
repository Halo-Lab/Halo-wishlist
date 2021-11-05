export const s3Config: any = {
  bucketName: process.env.REACT_APP_BUCKET_NAME || process.env.AWS_BUCKET_NAME,
  region: process.env.REACT_APP_REGION || process.env.AWS_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_ID || process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_ACCESS_KEY || process.env.AWS_ACCESS_KEY,
  dirName: process.env.REACT_APP_DIR_NAME || process.env.AWS_DIR_NAME,
};
