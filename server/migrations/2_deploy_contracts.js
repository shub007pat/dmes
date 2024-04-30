const Inventory = artifacts.require("Inventory");
const PartRegistry = artifacts.require("PartRegistry");
const OrderRegistry = artifacts.require("OrderRegistry");
const ProcessStepRegistry = artifacts.require("ProcessStepRegistry");

module.exports = function(deployer) {
  deployer.deploy(Inventory);
  deployer.deploy(PartRegistry);
  deployer.deploy(OrderRegistry);
  deployer.deploy(ProcessStepRegistry);
};
