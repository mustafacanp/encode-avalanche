const pinataSDK = require("@pinata/sdk");
const { PINATA_API_KEY, PINATA_SECRET_API_KEY } = require("./constants");

const pinata = pinataSDK(PINATA_API_KEY, PINATA_SECRET_API_KEY);

const pinJSONToIPFS = async function (imageLink) {
  const metadata = {
    name: "Awesome NFT",
    description: "NFT desc...",
    image: imageLink,
    external_link: "",
    attributes: [
      {
        trait_type: "color",
        value: "red",
      },
    ],
  };

  const jsonData = {
    pinataMetadata: metadata,
    pinataContent: metadata,
  };

  const options = {
    pinataMetadata: {
      keyvalues: {
        customKey: "customValue",
        customKey2: "customValue2",
      },
    },
    pinataOptions: {},
  };

  try {
    const res = await pinata.pinJSONToIPFS(jsonData, options);
    return res;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = pinJSONToIPFS;
