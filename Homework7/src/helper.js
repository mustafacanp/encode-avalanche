const { NFT_UPLOAD_FOLDER, FILE_EXTENSION } = require("./constants");

const getNftFilePath = (filename) =>
  `${NFT_UPLOAD_FOLDER}${filename}.${FILE_EXTENSION}`;

module.exports = {
  getNftFilePath,
};
