const { expect } = require("chai");

describe("DeBay", () => {
  describe("Deployment", () => {
    it("Should track the name and url of the collection", async () => {
      const NFT = await hre.ethers.getContractFactory("DeBay");

      const nft = await NFT.deploy();
      await nft.deployed();

      expect(await nft.name()).to.equal("DeBay NFT");
      expect(await nft.uri(1)).to.equal(
        "ipfs://bafybeihat5qbu4d4a3y6jcxms554ks2skypjyoqihhsdzy7scnteqmzt3i/1.json"
      );
    });
    it("Should revert if id is greater than 3", async () => {
      const [deployer, addr1, addr2] = await hre.ethers.getSigners();
      const NFT = await hre.ethers.getContractFactory("DeBay");

      const nft = await NFT.deploy();
      await nft.deployed();

      await expect(
        nft.connect(addr1).mint(nft.address, 4, 1, [])
      ).to.be.revertedWith("Id is invalid");
    });
    it("Should revert if amount is not 1", async () => {
      const [deployer, addr1, addr2] = await hre.ethers.getSigners();
      const NFT = await hre.ethers.getContractFactory("DeBay");

      const nft = await NFT.deploy();
      await nft.deployed();

      await expect(
        nft.connect(addr1).mint(nft.address, 1, 2, [])
      ).to.be.revertedWith("Invalid amount input");
    });
     it("Should mint nft but revert on second mint", async () => {
       const [deployer, addr1, addr2] = await hre.ethers.getSigners();
       const NFT = await hre.ethers.getContractFactory("DeBay");

       const nft = await NFT.deploy();
       await nft.deployed();
       await nft.connect(deployer).mint(deployer.address, 1, 1, []);
        await expect(nft.connect(deployer).mint(deployer.address, 1, 1, [])).to.be.revertedWith(
          "Must wait 2mins before minting another nft"
        );

       
     });
     it("Should revert on transfer", async () => {
       const [deployer, addr1, addr2] = await hre.ethers.getSigners();
       const NFT = await hre.ethers.getContractFactory("DeBay");

       const nft = await NFT.deploy();
       await nft.deployed();
       await nft.connect(deployer).mint(deployer.address, 1, 1, []);
       await expect(
         nft.connect(deployer).safeTransferFrom(deployer.address, addr1.address, 1, 1, [])
       ).to.be.revertedWith("DeBay: Cannot transfer Nfts");
    
     });
      it("Should destroy minted nft", async () => {
       const [deployer, addr1, addr2] = await hre.ethers.getSigners();
       const NFT = await hre.ethers.getContractFactory("DeBay");

       const nft = await NFT.deploy();
       await nft.deployed();
       await nft.connect(deployer).mint(deployer.address, 1, 1, []);
      expect(await nft.connect(deployer).balanceOf(deployer.address, 1)).to.equal(1);
      await nft.connect(deployer).burn(deployer.address, 1, 1);
       expect(
         await nft.connect(deployer).balanceOf(deployer.address, 1)
       ).to.equal(0);
    
     });
     
  });
     

  
});
