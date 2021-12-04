require("dotenv").config();
const express = require("express");
const generateImage = require("./generateImage");
const pinFileToIPFS = require("./pinFileToIPFS");

const app = express();
app.use(express.json());
const port = 3000;

app.get("/", async (req, res) => {
  return res.send("Welcome to the NFT generator app!");
});

app.get("/get-image-from-ipfs/:pid", async (req, res) => {
  const { pid } = req.params;
  const ipfsUrl = `https://ipfs.io/ipfs/${pid}`;
  return res.send(ipfsUrl);
});

app.post("/ipfs-upload", async (req, res) => {
  const { filename, name, pinataName } = req.body;

  // Create the NFT image
  await generateImage(filename, name);

  // Send NFT image to the IPFS
  const ipfsHash = await pinFileToIPFS(filename, pinataName);

  return res.send(`https://ipfs.io/ipfs/${ipfsHash.IpfsHash}`);
});

app.listen(port, () => {
  console.log(`ipfs-services listening at ${port}`);
});
