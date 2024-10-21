const FishermenWelfare = artifacts.require("FishermenWelfare");
const PiCoin = artifacts.require("PiCoin"); // Assuming PiCoin is an ERC20 token contract

module.exports = async function (deployer) {
  // Deploy the PiCoin token first
  await deployer.deploy(PiCoin);
  const piCoinInstance = await PiCoin.deployed();

  // Deploy the FishermenWelfare contract with the PiCoin address
  await deployer.deploy(FishermenWelfare, piCoinInstance.address);
};
