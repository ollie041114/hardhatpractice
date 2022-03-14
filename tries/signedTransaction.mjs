import abi from "../abi/Thanks.json";
import {} from 'dotenv/config';
import dotenv from 'dotenv';
import pkg from '@ethereumjs/tx';
const { Transaction } = pkg;
dotenv.config({path: '../.env'});
import _Common from '@ethereumjs/common'
const Common = _Common.default

const customChainParams = { name: 'matic-mumbai', chainId: 80001, networkId: 80001 }
const common = Common.forCustomChain('goerli', customChainParams);

import Web3 from "web3";


const account1 = process.env.address;
const privateKey1 = Buffer.from(process.env.PRIVATE_KEY, 'hex');

const contractABI = abi; 
const contractAddress = process.env.thanksAddress;

export const web3 = new Web3(new Web3.providers.HttpProvider(process.env.polygonRPC));

export const contract = new web3.eth.Contract(contractABI, contractAddress);


export async function signedTransaction(func, globalCallback){
    async function myFunction(callback){
        web3.eth.getTransactionCount(account1, (err, txCount) => {
            const txObject = {
                "chainId": process.env.chainId,
                "nonce":    web3.utils.toHex(txCount),
                "gasLimit": "0x02625a00",
                // maxPriorityFeePerGas: "0x01",
                // maxFeePerGas: "0xff",
                "to": contractAddress,
                "type": "0x02",
                "data": func
            }
            console.log(contractAddress);
            console.log(account1);        
            var tx = new Transaction(txObject,  { common: common });
            tx.sign(privateKey1);
            var stx = tx.serialize();
            
            // web3.eth.sendSignedTransaction('0x' + stx.toString('hex'), async (err, hash) => {
            //      if (err) { console.log(err);
            //         return;
            //     }
            //      var transactionHash = hash;
            //      callback(transactionHash);
            //      console.log("transaction hash is "+transactionHash);
            // }
            // );
            })
        }
        const expectedBlockTime = 1000; 
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        }
        
    myFunction(function(hash) {
        var transactionHash = hash;
        console.log("Hash to be returned is " + transactionHash);
        (async function () {
            let transactionReceipt = null
                while (transactionReceipt == null) { // Waiting expectedBlockTime until the transaction is mined
                    transactionReceipt = await web3.eth.getTransactionReceipt(transactionHash);
                    await sleep(expectedBlockTime)
                }
                console.log("Got the transaction receipt: ", transactionReceipt);
                globalCallback(transactionReceipt);
        })();
    });
}