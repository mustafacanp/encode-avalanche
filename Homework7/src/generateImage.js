const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const { CANVAS_WIDTH, CANVAS_HEIGHT } = require("./constants");
const { getNftFilePath } = require("./helper");

const generateImage = async function (filename, name) {
  const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  const context = canvas.getContext("2d");

  // Fill Backkground
  context.fillStyle = "#063bea";
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // Create gradient
  const gradientBG = context.createLinearGradient(0, 0, CANVAS_WIDTH, 0);
  gradientBG.addColorStop(0, "#e84142");
  gradientBG.addColorStop(1, "#3c00ff");
  // Fill with gradient
  context.fillStyle = gradientBG;
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  context.textAlign = "center";
  context.textBaseline = "top";

  // Title
  context.fillStyle = "#FFF";
  context.font = "20px sans-serif";
  context.fillText("Certificate of Training", CANVAS_WIDTH / 2, 30);

  // Name Surname
  context.fillStyle = "#FFF";
  context.font = "bold 14px sans-serif";
  context.fillText(name, CANVAS_WIDTH / 2, 80);

  // Description
  context.fillStyle = "#FFF";
  context.font = "12px sans-serif";
  context.fillText("has successfully completed", CANVAS_WIDTH / 2, 120);

  // Description
  context.fillStyle = "#FFF";
  context.font = "bold 14px sans-serif";
  context.fillText("Encode Solidity Bootcamp", CANVAS_WIDTH / 2, 160);

  // Date
  context.fillStyle = "#FFF";
  context.font = "12px sans-serif";
  context.fillText(
    "November 3, 2021 - February 2, 2022",
    CANVAS_WIDTH / 2,
    200
  );

  // Link
  context.fillStyle = "#FFF";
  context.font = "10px sans-serif";
  context.fillText(
    "https://www.encode.club",
    CANVAS_WIDTH / 2 + 50,
    CANVAS_HEIGHT - 40
  );

  // Background Image
  const bgImage = await loadImage("./images/bg.png");
  context.drawImage(bgImage, 130, 140, 300, 200);
  // Logo
  const logoImage = await loadImage("./images/logo.png");
  context.drawImage(logoImage, 150, CANVAS_HEIGHT - 60, 50, 50);

  // Generate File
  const buffer = canvas.toBuffer("image/png");
  const filePath = getNftFilePath(filename);
  fs.writeFileSync(filePath, buffer);
};

module.exports = generateImage;
