const EthereumHandler = require("./EthereumHandler");
const Writer = require("./writer");

const ethers = new EthereumHandler();
const writer = new Writer();
ethers.cons();
writer.newWorker("please", "please", process.env.thanksAddress, "please").then(result => console.log(result));

