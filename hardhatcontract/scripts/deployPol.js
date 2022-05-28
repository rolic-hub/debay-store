// 0x07097E07FA086bA1E6379F8DAD57A22158097b3E

const main = async () => {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", await deployer.getBalance());
  const Price = await hre.ethers.getContractFactory(
    "priceFeedPol"
  );
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
