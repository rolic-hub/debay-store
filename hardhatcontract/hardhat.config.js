require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: process.env.ALCHEMY_URL_RINKEBY,
      accounts: [process.env.PRIVATE_KEY],
    },
    polygon: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/y_eQkk-xNUDYHBLvXhoipyEWcrq04D3D",
      accounts: [process.env.PRIVATE_KEY],
    },
    bsc: {
      url:"https://speedy-nodes-nyc.moralis.io/8c1f76fce7103bdf825d7a48/bsc/testnet",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
