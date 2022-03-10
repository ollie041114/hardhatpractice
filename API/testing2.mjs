import { ethers } from "ethers";
import dotenv from 'dotenv';
dotenv.config({path: '../.env'});

const abi = [
	"function newWorker(string workerEmail, string partnerLicenseId, address klaytnAcc, string workerHashData) payable"
  ];
const provider = new ethers.providers.JsonRpcProvider(process.env.polygonRPC);
const signer = ethers.Wallet.fromMnemonic(process.env.mnemonic).connect(provider);
const address = process.env.thanksAddress;

async function newWorker() {
	const contract = new ethers.Contract(address, abi, signer);   
	const tx = await contract.functions.newWorker("yess@unist.ac.kr","lol","0x70997970c51812dc3a010c7d01b50e0d17dc79c8","lol");

	const receipt = await tx.wait();
	console.log("receipt", receipt);
}

newWorker();