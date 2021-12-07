const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRTETKEY,
  region: process.env.S3_REGION,
});

const storage = multerS3({
  s3: s3,
  bucket: `moongoris3`,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: `public-read-write`,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    const id = req.cookies.id;
    console.log(req.params);
    cb(null, `uploads/${id}/${Date.now()}_${file.originalname}`);
  },
});

module.exports = multer({ storage: storage }).array("img");
