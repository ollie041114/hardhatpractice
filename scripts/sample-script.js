// scripts/create-box.js
const { ethers, upgrades } = require("hardhat");
require('dotenv').config({path:'../.env'});

async function main() {
  const Thanks = await ethers.getContractFactory("Thanks");
  const thanks = await upgrades.deployProxy(Thanks, []);
  await thanks.deployed();
  console.log("Thanks deployed to:", thanks.address);
}

main();