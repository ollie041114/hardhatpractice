import {} from 'dotenv/config';
import dotenv from 'dotenv';
import path from 'path';
import {fileURLToPath} from 'url';
import Web3 from "web3";
import abi from "../abi/Thanks.json" assert {type: 'json'};
import { ethers } from "ethers";

dotenv.config({path: '../test.env'});

export class ContractAPI{
  constructor(){
    this.provider = new ethers.providers.JsonRpcProvider(process.env.polygonRPC);
    this.signer = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
    this.address = process.env.thanksAddress;
    this.Contract = new ethers.Contract(this.address, abi, this.signer);  
    this.gasLimit = {

    };
  }

  async newWorker(...information) {
     try {
      const result = await this.Contract.functions.newWorker.apply(information, information);
      const a = await this.provider.getTransaction(result.hash);
      let code = await this.provider.call(a);
    } catch (err) {
        console.log(err.error);
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