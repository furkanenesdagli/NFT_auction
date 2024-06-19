require("@nomiclabs/hardhat-waffle");


// Hardhat - ETH projesinin akıllı sözleşmeleri debug, deploy ve test edebildiğimiz kütüphanedir. Solidity ile.
module.exports = {
  solidity: "0.8.4", // versiyonların contractlarda da aynı olması gerekiyor.
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
};
