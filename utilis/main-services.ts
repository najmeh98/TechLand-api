import AWS from "aws-sdk";
import { createHmac } from "crypto";

const spaceEndpoint = new AWS.Endpoint(
  "https://s3.ir-thr-at1.arvanstorage.com"
);

const accesskeyid: any = process.env.UPLOADER_ACCESS_KEY;
const secretkey: any = process.env.UPLOADER_SECRET_ACCESSKEY;

const s3 = new AWS.S3({
  endpoint: spaceEndpoint,
  accessKeyId: accesskeyid,
  secretAccessKey: secretkey,
});

// bucket
export const uploaderConfig: any = {
  createImage: { bucket: "imagecategory", format: "jpg" },
};

export const uploadService = async (
  req: any,
  bucket: any,
  format: any
): Promise<string> => {
  const date: any = Date();
  const hashKey: any = process.env.UPLEADER_HASH_KEY;
  // Initializing the createHmac method using secret
  // data to be encoded
  // Defining encoding
  const filename: string = createHmac("md5", hashKey)
    .update(date)
    .digest("hex");

  if (!req.files) {
    return "no image access";
  } else {
    const body: string = req.files.file.data;
    // encrypt base on base64
    let base64data = Buffer.from(body, "binary");
    const uploadParams = await s3
      .upload({
        Bucket: bucket,
        Body: base64data,
        Key: filename + format,
        ACL: "public-read",
      })
      .promise();

    const answer: string = uploadParams.Location;
    return answer;
  }
};
