

stack
- Solidity dili
- Javascript - React dili 
- Hardhat Framework
- IPFS olarak pinata (api key ile belirli sayıda request bedava)

## çalıştırmak için komutlar: 

- npm install
- npx hardhat node : bize 20 adet içerisinde 10k fake eth olan hesap keyleri verir.
- metamask extension indir.
- metamask bağlantı ve local ağ oluştur.

- #### localhost:8545 portunda 
  - chain id : 31337
  - Name : örn Local Host
  - New RPC URL : http://127.0.0.1:8545 (localhost)
  - Currency Type  :  ETH Hardhat yazılabilir.

<<<<<<< HEAD

- npx hardhat run src/backend/scripts/deploy.js --network localhost : local blokchain ağımızda başarıyla nft akıllı kontratlarıları çalıştırdı.
=======
### akıllı contratları çalıştır
- npx hardhat run src/backend/scripts/deploy.js --network localhost
>>>>>>> 76d687d1a00020d4feff64ef56e5391015d81c60

#### FE ayağa kaldırmak için.
- npm run start



-------

# Adım adım

hardhat node