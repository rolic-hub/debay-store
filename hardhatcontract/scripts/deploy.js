// 0x0267f4b2DcF13e1617F96569DbA8bF1f23329579 --ethContract
const hre = require("hardhat");

const main = async () => {
const [deployer] = await hre.ethers.getSigners();

console.log("Deploying contracts with the account:", deployer.address);
console.log("Account balance:", (await deployer.getBalance()));
const Price = await hre.ethers.getContractFactory(
  "priceFeedEth"
);
const price= await Price.deploy();

await price.deployed();

console.log("Price deployed to:", price.address);
}

const runMain = () => {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
};

runMain();