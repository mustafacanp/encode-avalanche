const fs = require("fs");
const pinataSDK = require("@pinata/sdk");
const { PINATA_API_KEY, PINATA_SECRET_API_KEY } = require("./constants");
const { getNftFilePath } = require("./helper");

const pinata = pinataSDK(PINATA_API_KEY, PINATA_SECRET_API_KEY);

const pinFileToIPFS = async function (name) {
  const filePath = getNftFilePath("temp");
  const readableStreamForFile = fs.createReadStream(filePath);

  const options = {
    pinataMetadata: {
      name,
      keyvalues: {
        customKey: "customValue",
        customKey2: "customValue2",
      },
    },
    pinataOptions: {},
  };

  try {
    const res = await pinata.pinFileToIPFS(readableStreamForFile, options);
    // Rename the file with the IPFS hash
    await fs.rename(filePath, getNftFilePath(res.IpfsHash), function (err) {
      if (err) console.log("error", err);
    });
    return res;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = pinFileToIPFS;
