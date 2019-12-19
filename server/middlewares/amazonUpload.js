const multer = require("multer");
const multers3 = require("multer-s3");
const aws = require("aws-sdk");

const s3 = new aws.S3({
  accessKeyId: process.env.AMAZON_PUBLIC,
  secretAccessKey: process.env.AMAZON_SECRET,
  region: "ca-central-1"
});
const upload = multer({
  storage: multers3({
    s3: s3,
    bucket: "dreamschoolstest",
    acl: "public-read",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});
module.exports = upload;
