// import { contract, signedTransaction, web3 } from "./signedTransaction.mjs";
import abi from "../abi/Thanks.json" assert {type: 'json'};
import Web3 from "web3";
import dotenv from 'dotenv';
var Tx = require('ethereumjs-tx');
var privateKey = new Buffer()

dotenv.config({path: '../test.env'});


async function lol(){
    const ethNetwork = process.env.polygonRPC
    const web3 = await new Web3(new Web3.providers.WebsocketProvider(ethNetwork))

    // abi and address defined here
    const contract = await new web3.eth.Contract(abi, process.env.thanksAddress);

    // PRIVATE_KEY variable defined
    const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY)

    // define METHOD_NAME, ARG1, ARG2 here
    const sendEIP1559Transaction = async () => {
        const web3 = new Web3(process.env.polygonRPC);
        const func = contract.methods.newWorker.apply("lol", "lol", "0x051bDEf47D55dCfB8F2DD375aa436C5Fe7ab7f82", "lol")
        .encodeABI();
        await web3.eth.sendTransactions({
            from: process.env.address,
            to: process.env.thanksAddress,
            value: 0,
            maxPriorityFeePerGas: 40000000000,
            data: func
        })
    }
}

lol();