import AWS from "aws-sdk"

AWS.config.update({
  accessKeyId: "AKIAUVJSKU37X3A6PCBA",
  secretAccessKey: "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",
  region: "us-east-1"

  // accessKeyId: "AKIAVB2USJPTRQRSNCXR",
  // secretAccessKey: "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",
  // region: "ap-south-1"
})

export
 const myS3Bucket = new AWS.S3(),
  S3_BUCKET = "unisala-prod"
