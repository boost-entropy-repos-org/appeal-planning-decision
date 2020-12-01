const { Schema, model } = require('mongoose');

const FileUploadSchema = new Schema(
  {
    uuid: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = model('FileUpload', FileUploadSchema);
