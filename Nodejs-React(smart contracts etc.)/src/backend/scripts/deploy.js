async function main() {
  // Hesaplar aracılığıyla ethers kütüphanesini kullanarak deployer hesabını alıyoruz.
  const [deployer] = await ethers.getSigners();

  // Deployer hesabıyla kontratları dağıtıyoruz.
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // ContractFactory'leri ve Signer'ları alıyoruz.
  const NFT = await ethers.getContractFactory("NFT");
  const Marketplace = await ethers.getContractFactory("Marketplace");

  // Marketplace ve NFT kontratlarını dağıtıyoruz.
  const marketplace = await Marketplace.deploy(1); // Marketplace kontratını deploy ediyoruz ve vergiyi yuzde 1 belirtiyoruz.
  const nft = await NFT.deploy(); // NFT kontratını deploy ediyoruz.

 
  saveFrontendFiles(marketplace , "Marketplace");
  saveFrontendFiles(nft , "NFT");
}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../frontend/contractsData";


  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  // Kontratın adresini JSON dosyasına yazıyoruz.
  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  // Kontratın abi'sini JSON dosyasına yazıyoruz.
  const contractArtifact = artifacts.readArtifactSync(name);
  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

// main fonksiyonunu çağırıyoruz.
main()
  .then(() => process.exit(0)) // İşlem başarılıysa 0 koduyla işlemi sonlandırıyoruz.
  .catch(error => {
    console.error(error); // Hata varsa konsola yazdırıyoruz.
    process.exit(1); // Hata durumunda işlemi 1 koduyla sonlandırıyoruz.
  });
