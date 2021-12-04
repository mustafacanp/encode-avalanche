const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VolcanoToken", function () {
  it("Deploy contract", async function () {
    const VolcanoToken = await ethers.getContractFactory("VolcanoToken");
    const volcanoToken = await VolcanoToken.deploy("VolcanoToken", "VCN");
    await volcanoToken.deployed();
  });
});
