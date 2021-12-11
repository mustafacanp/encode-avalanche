require("dotenv").config();
const cors = require("cors");
const express = require("express");
const generateImage = require("./generateImage");
const pinFileToIPFS = require("./pinFileToIPFS");

const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;

app.get("/", async (req, res) => {
  return res.send("Welcome to the NFT generator app!");
});

app.get("/get-image-from-ipfs/:pid", async (req, res) => {
  const { pid } = req.params;
  const ipfsUrl = `https://ipfs.io/ipfs/${pid}`;
  return res.send(ipfsUrl);
});

app.post("/ipfs-upload", async (req, res) => {
  const { name } = req.body;

  // Create the NFT image
  await generateImage(name);

  // Send NFT image to the IPFS
  const ipfsHash = await pinFileToIPFS(name);

  return res.send(`https://ipfs.io/ipfs/${ipfsHash.IpfsHash}`);
});

app.listen(port, () => {
  console.log(`ipfs-services listening at ${port}`);
});
