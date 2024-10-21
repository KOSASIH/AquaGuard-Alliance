const CommunityEvents = artifacts.require("CommunityEvents");

module.exports = function (deployer) {
  // Deploy the CommunityEvents contract
  deployer.deploy(CommunityEvents);
};
