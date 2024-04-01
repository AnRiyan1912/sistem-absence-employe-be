import moment from "moment";
import multer from "multer";

export const fileUpload = (
  destinationFolder: String,
  prefix: String,
  fileType: String
) => {
  const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${__dirname}/../public/images/${destinationFolder}`);
    },
    filename: (req, file, cb) => {
      const fileExtention = file.mimetype.split("/")[1];
      const fileName = `${prefix}_${moment().format(
        "YYYY-MM-DD-HH-mm-ss"
      )}.${fileExtention}`;
      cb(null, fileName);
    },
  });

  const upload = multer({
    storage: storageConfig,
    fileFilter: (req, file, cb) => {
      if (file.mimetype.split("/")[0] != fileType) {
        return cb(null, false);
      }
      return cb(null, true);
    },
    limits: { fileSize: 5000000 },
  });

  return upload;
};
