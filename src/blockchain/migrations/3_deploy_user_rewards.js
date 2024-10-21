const UserRewards = artifacts.require("User Rewards");
const PiCoin = artifacts.require("PiCoin");

module.exports = async function (deployer) {
  const piCoinInstance = await PiCoin.deployed();

  // Deploy the UserRewards contract with the PiCoin address
  await deployer.deploy(UserRewards, piCoinInstance.address);
};
