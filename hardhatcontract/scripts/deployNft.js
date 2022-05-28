
const hre = require("hardhat");
const main = async () => {
  const Dbay = await hre.ethers.getContractFactory("DeBay");
  const dbay = await Dbay.deploy();

  await dbay.deployed();

  console.log("DeBay deployed to:", dbay.address);
 
};

const runMain = () => {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
};

runMain();
