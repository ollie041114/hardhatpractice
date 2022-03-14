import {} from 'dotenv/config';
import dotenv from 'dotenv';
import abi from "../abi/Thanks.json";
import { ethers } from "ethers";

dotenv.config({path: '../.env'});

export class ContractAPI{
  constructor(){
    
    this.provider = new ethers.providers.InfuraProvider(process.env.polygonRPC);
    this.signer = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
    this.address = process.env.thanksAddress;
    this.Contract = new ethers.Contract(this.address, abi, this.signer);  
    this.options = {
      type: 2,
      maxPriorityFeePerGas: "1000000", // Recommended maxPriorityFeePerGas
      maxFeePerGas: "10000000", // Recommended maxFeePerGas
      value: "0",
      gasLimit: "2100000"
    };
  }

  async newWorker(...information) {
     try {
      information.push(this.options)
      const result = await this.Contract.functions.newWorker.apply(information, information);
      const a = await this.provider.getTransaction(result.hash);
      let code = await this.provider.call(a);
    } catch (err) {
        console.log(err);
    }
  }

  async getWorker(...information) {
    information.push(this.gasLimit);
    const result = await this.Contract.functions.getWorker.apply(information, information);
    return result;
  }

  async editWorker(...information) {
    await this.Contract.functions.editWorker.apply(information, information);
  }


}