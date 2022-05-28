const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("priceFeedEth", function () {
  it("Should return the price of eth in usd", async function () {
    const owner = ethers.getSigners();
    const Price = await ethers.getContractFactory(
      "contracts/priceFeedsEth.sol:priceFeedEth"
    );
    const price = await Price.deploy();
   

    const priceFeed = price.getLatestPrice();
    console.log("Eth in usd :", priceFeed);
   
  });

   it("Should return the price of matic in usd", async function () {
     const owner = ethers.getSigners();
     const Price = await ethers.getContractFactory("priceFeedPol");
     const price = await Price.deploy();

     const priceFeed = price.getLatestPrice();
     console.log("Matic in usd :", priceFeed);
   });

    it("Should return the price of Bsc in usd", async function () {
      const owner = ethers.getSigners();
      const Price = await ethers.getContractFactory(
        "priceFeedBsc"
      );
      const price = await Price.deploy();

      const priceFeed = price.getLatestPrice();
      console.log("Bsc in usd :", priceFeed);
    });
});
