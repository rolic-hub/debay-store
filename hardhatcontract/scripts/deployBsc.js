//0x4f1e4d09C096c6CBC932EBccB78D177438e1cD34 - bsc

const main = async () => {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", await deployer.getBalance());
  const Price = await hre.ethers.getContractFactory("priceFeedBsc");
  const price = await Price.deploy();

  await price.deployed();

  console.log("Price deployed to:", price.address);
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
