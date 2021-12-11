const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 300;
const BASE_URL = "./images";
const NFT_UPLOAD_FOLDER = "./nfts/";
const FILE_EXTENSION = "png";
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;

module.exports = {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  BASE_URL,
  NFT_UPLOAD_FOLDER,
  FILE_EXTENSION,
  PINATA_API_KEY,
  PINATA_SECRET_API_KEY,
};