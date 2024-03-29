const { expect, use } = require("chai");
const { ethers } = require("hardhat");
const {
  constants, // Common constants, like the zero address and largest integers
  expectRevert, // Assertions for transactions that should fail
  expectEvent,
} = require("@openzeppelin/test-helpers");

const { solidity } = require("ethereum-waffle");
use(solidity);

// https://www.chaijs.com/guide/styles/
// https://ethereum-waffle.readthedocs.io/en/latest/matchers.html

describe("Volcano Coin", () => {
  let volcanoContract;
  let owner, addr1, addr2, addr3;

  beforeEach(async () => {
    const Volcano = await ethers.getContractFactory("VolcanoCoin");
    volcanoContract = await Volcano.deploy();
    await volcanoContract.deployed();

    [owner, addr1, addr2, addr3] = await ethers.getSigners();
  });

  it("has a name", async () => {
    let contractName = await volcanoContract.name();
    expect(contractName).to.equal("Volcano Coin");
  });

  // it("reverts when transferring tokens to the zero address", async () => {
  //   await expectRevert(
  //     volcanoContract.transfer(constants.ZERO_ADDRESS, 10),
  //     "ERC20: transfer to the zero address"
  //   );
  // });

  //homework
  it("has a symbol", async () => {
    let symbol = await volcanoContract.symbol();
    expect(symbol).to.equal("VLC");
  });
  it("has 18 decimals", async () => {
    let decimals = await volcanoContract.decimals();
    expect(decimals).to.equal(18);
  });
  it("assigns initial balance", async () => {
    let totalSupply = await volcanoContract.totalSupply();
    expect(totalSupply).to.equal(100000);
  });

  it("increases allowance for address1", async () => {
    await volcanoContract.increaseAllowance(addr1.address, 100);
    let allowance = await volcanoContract.allowance(
      owner.address,
      addr1.address
    );
    expect(allowance).to.equal(100);
  });
  it("decreases allowance for address1", async () => {
    await volcanoContract.increaseAllowance(addr1.address, 100);
    await volcanoContract.decreaseAllowance(addr1.address, 10);
    let allowance = await volcanoContract.allowance(
      owner.address,
      addr1.address
    );
    expect(allowance).to.equal(90);
  });
  // it("emits an event when increasing allowance", async () => {
  //   // Store a value - recall that only the owner account can do this!
  //   const increaseAllowance = await volcanoContract.increaseAllowance(
  //     addr1.address,
  //     100
  //   );
  //   expectEvent(increaseAllowance, "Approval");
  // });
  // it("revets decreaseAllowance when trying decrease below 0", async () => {});

  // it("updates balances on successful transfer from owner to addr1", async () => {});
  // it("revets transfer when sender does not have enough balance", async () => {});

  // it("reverts transferFrom addr1 to addr2 called by the owner without setting allowance", async () => {});
  // it("updates balances after transferFrom addr1 to addr2 called by the owner", async () => {});
});
