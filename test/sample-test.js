const { expect } = require("chai");
const { ethers } = require("hardhat");
const Writer = require('../API/writer.js');
const Investigator = require('../API/investigator.js');
const Reader = require('../API/reader.js');
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe("Thanks check", function () {
  var writer = new Writer();; 
  var investigator = new Investigator();
  var reader = new Reader();;
  var randomInt = getRandomInt(1, 100000000);
  var hash;

  beforeEach(async function() {
  });

  it("Should write a new worker", async function () {
    this.timeout(0);
    const email = randomInt + "@google.com";
    console.log(email);
    hash = await writer.newWorker(email, "lol", "0x5e714A21331A2bC941abF45F8Ba974B1B226eBd3", "350");
    expect(hash).to.not.be.empty;
  });

  it("Should revert if registering same worker twice", async function () {
    this.timeout(0);
    const email = randomInt + "@google.com";
    console.log(email);
    hash2 = await writer.newWorker(email, "lol", "0x5e714A21331A2bC941abF45F8Ba974B1B226eBd3", "350");
    const reason = await investigator.getRevertReason(hash2);
    expect(reason).to.not.equal("Success");
    console.log(reason);
  });

  it("Should read a new worker", async function(){
    this.timeout(0);
    const email = "2145416@google.com";
    const worker = await reader.getWorker(email);
    expect(worker[0]).to.equal(email);
  });
   
});
