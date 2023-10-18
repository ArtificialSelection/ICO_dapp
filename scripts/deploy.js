const hre = require("hardhat");

const tokens = (nToken) => {
  return ethers.utils.parseUnits(nToken.toString(), "ether");
};

async function main() {
  //Deploy Token contract
  const _initialSupply = tokens(1000000000);

  const TheArtificialSelectionCoders = await hre.ethers.getContractFactory(
    "TheArtificialSelectionCoders"
  );

  const theArtificialSelectionCoders =
    await TheArtificialSelectionCoders.deploy(_initialSupply);

  await theArtificialSelectionCoders.deployed();
  console.log(
    `TheArtificialSelectionCoders: ${theArtificialSelectionCoders.address}`
  );

  //Token sale Contract

  const _tokenPrice = tokens(0.001);

  const TokenSale = await hre.ethers.getContractFactory("TokenSale");
  const tokenSale = await TokenSale.deploy(
    theArtificialSelectionCoders.address,
    _tokenPrice
  );

  await tokenSale.deployed();
  console.log(`TokenSale: ${tokenSale.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
